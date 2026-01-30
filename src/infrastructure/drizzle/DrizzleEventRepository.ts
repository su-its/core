import { eq, inArray } from "drizzle-orm";
import {
	Event,
	type EventRepository,
	Exhibit,
	LightningTalk,
	LightningTalkDuration,
	Url,
} from "../../domain";
import { getDb } from "./client";
import {
	events,
	exhibits,
	lightningTalks,
	memberEvents,
	memberExhibits,
} from "./schema";

type MemberExhibitRecord = typeof memberExhibits.$inferSelect;

type ExhibitWithLightningTalk = typeof exhibits.$inferSelect & {
	lightningTalk: typeof lightningTalks.$inferSelect | null;
	memberExhibits: MemberExhibitRecord[];
};

type MemberEventRecord = typeof memberEvents.$inferSelect;

type EventWithExhibits = typeof events.$inferSelect & {
	exhibits: ExhibitWithLightningTalk[];
	memberEvents: MemberEventRecord[];
};

export class DrizzleEventRepository implements EventRepository {
	private toDomain(record: EventWithExhibits): Event {
		const event = new Event(record.id, record.name, record.date);

		// Load event member IDs
		for (const memberEvent of record.memberEvents) {
			event.addMemberId(memberEvent.memberId);
		}

		for (const exhibitRecord of record.exhibits) {
			let exhibit: Exhibit;

			if (exhibitRecord.lightningTalk) {
				const ltRecord = exhibitRecord.lightningTalk;
				const lightningTalk = new LightningTalk(
					ltRecord.exhibitId,
					ltRecord.startTime,
					new LightningTalkDuration(ltRecord.duration),
					ltRecord.slideUrl ? new Url(ltRecord.slideUrl) : undefined,
				);

				exhibit = Exhibit.createWithLightningTalk(
					exhibitRecord.id,
					exhibitRecord.name,
					lightningTalk,
					exhibitRecord.description ?? undefined,
					exhibitRecord.markdownContent ?? undefined,
					exhibitRecord.url ? new Url(exhibitRecord.url) : undefined,
				);
			} else {
				exhibit = new Exhibit(
					exhibitRecord.id,
					exhibitRecord.name,
					exhibitRecord.description ?? undefined,
					exhibitRecord.markdownContent ?? undefined,
					exhibitRecord.url ? new Url(exhibitRecord.url) : undefined,
				);
			}

			// Load exhibit member IDs
			for (const memberExhibit of exhibitRecord.memberExhibits) {
				exhibit.addMemberId(memberExhibit.memberId);
			}

			event.addExhibit(exhibit);
		}

		return event;
	}

	private async persistEvent(event: Event): Promise<void> {
		const db = getDb();
		const snapshot = event.toSnapshot();

		// 1) Event upsert
		await db
			.insert(events)
			.values({
				id: snapshot.id,
				name: snapshot.name,
				date: snapshot.date,
				updatedAt: new Date(),
			})
			.onConflictDoUpdate({
				target: events.id,
				set: {
					name: snapshot.name,
					date: snapshot.date,
					updatedAt: new Date(),
				},
			});

		// 2) Find obsolete exhibits and clean up
		const snapshotExhibitIds = snapshot.exhibits.map((ex) => ex.id);
		const obsoleteExhibitIds = await this.findObsoleteExhibitIds(
			snapshot.id,
			snapshotExhibitIds,
		);

		if (obsoleteExhibitIds.length > 0) {
			// Delete lightning talks for obsolete exhibits
			await db
				.delete(lightningTalks)
				.where(inArray(lightningTalks.exhibitId, obsoleteExhibitIds));

			// Delete member exhibits for obsolete exhibits
			await db
				.delete(memberExhibits)
				.where(inArray(memberExhibits.exhibitId, obsoleteExhibitIds));

			// Delete obsolete exhibits
			await db.delete(exhibits).where(inArray(exhibits.id, obsoleteExhibitIds));
		}

		// 3) Upsert exhibits
		for (const ex of snapshot.exhibits) {
			await db
				.insert(exhibits)
				.values({
					id: ex.id,
					name: ex.name,
					description: ex.description ?? null,
					markdownContent: ex.markdownContent ?? null,
					url: ex.url?.getValue() ?? null,
					eventId: snapshot.id,
					updatedAt: new Date(),
				})
				.onConflictDoUpdate({
					target: exhibits.id,
					set: {
						name: ex.name,
						description: ex.description ?? null,
						markdownContent: ex.markdownContent ?? null,
						url: ex.url?.getValue() ?? null,
						updatedAt: new Date(),
					},
				});

			// Lightning talk
			if (ex.lightningTalk) {
				await db
					.insert(lightningTalks)
					.values({
						exhibitId: ex.id,
						startTime: ex.lightningTalk.startTime,
						duration: ex.lightningTalk.durationMinutes.getValue(),
						slideUrl: ex.lightningTalk.slideUrl?.getValue() ?? null,
						updatedAt: new Date(),
					})
					.onConflictDoUpdate({
						target: lightningTalks.exhibitId,
						set: {
							startTime: ex.lightningTalk.startTime,
							duration: ex.lightningTalk.durationMinutes.getValue(),
							slideUrl: ex.lightningTalk.slideUrl?.getValue() ?? null,
							updatedAt: new Date(),
						},
					});
			} else {
				// Delete if exists
				await db
					.delete(lightningTalks)
					.where(eq(lightningTalks.exhibitId, ex.id));
			}
		}

		// 4) Sync member events
		const eventMemberIds = event.getMemberIds();

		// Delete existing and re-insert
		await db.delete(memberEvents).where(eq(memberEvents.eventId, snapshot.id));

		for (const memberId of eventMemberIds) {
			await db
				.insert(memberEvents)
				.values({
					memberId,
					eventId: snapshot.id,
					updatedAt: new Date(),
				})
				.onConflictDoNothing();
		}

		// 5) Sync member exhibits
		for (const exhibitDomain of event.getExhibits()) {
			const exhibitMemberIds = exhibitDomain.getMemberIds();

			await db
				.delete(memberExhibits)
				.where(eq(memberExhibits.exhibitId, exhibitDomain.id));

			for (const memberId of exhibitMemberIds) {
				await db
					.insert(memberExhibits)
					.values({
						memberId,
						exhibitId: exhibitDomain.id,
						updatedAt: new Date(),
					})
					.onConflictDoNothing();
			}
		}
	}

	private async findObsoleteExhibitIds(
		eventId: string,
		keptExhibitIds: string[],
	): Promise<string[]> {
		const db = getDb();
		const existingExhibits = await db
			.select({ id: exhibits.id })
			.from(exhibits)
			.where(eq(exhibits.eventId, eventId));

		const existingIdSet = new Set(existingExhibits.map((r) => r.id));
		const keptIdSet = new Set(keptExhibitIds);

		return [...existingIdSet].filter((id) => !keptIdSet.has(id));
	}

	async findById(id: string): Promise<Event | null> {
		const db = getDb();
		const record = await db.query.events.findFirst({
			where: eq(events.id, id),
			with: {
				memberEvents: true,
				exhibits: {
					with: {
						lightningTalk: true,
						memberExhibits: true,
					},
				},
			},
		});

		if (!record) return null;
		return this.toDomain(record);
	}

	async findByParticipantMemberId(memberId: string): Promise<Event[]> {
		const db = getDb();

		// Find event IDs where the member participates
		const participations = await db
			.select({ eventId: memberEvents.eventId })
			.from(memberEvents)
			.where(eq(memberEvents.memberId, memberId));

		if (participations.length === 0) return [];

		const eventIds = participations.map((p) => p.eventId);
		const records = await db.query.events.findMany({
			where: inArray(events.id, eventIds),
			with: {
				memberEvents: true,
				exhibits: {
					with: {
						lightningTalk: true,
						memberExhibits: true,
					},
				},
			},
		});

		return records.map((r) => this.toDomain(r));
	}

	async findByExhibitId(exhibitId: string): Promise<Event | null> {
		const db = getDb();

		const exhibit = await db
			.select({ eventId: exhibits.eventId })
			.from(exhibits)
			.where(eq(exhibits.id, exhibitId))
			.limit(1);

		if (exhibit.length === 0) return null;

		return this.findById(exhibit[0].eventId);
	}

	async findAll(): Promise<Event[]> {
		const db = getDb();
		const records = await db.query.events.findMany({
			with: {
				memberEvents: true,
				exhibits: {
					with: {
						lightningTalk: true,
						memberExhibits: true,
					},
				},
			},
		});

		return records.map((r) => this.toDomain(r));
	}

	async save(event: Event): Promise<void> {
		await this.persistEvent(event);
	}

	async delete(eventId: string): Promise<void> {
		const db = getDb();

		// Find exhibit IDs
		const exhibitRecords = await db
			.select({ id: exhibits.id })
			.from(exhibits)
			.where(eq(exhibits.eventId, eventId));
		const exhibitIds = exhibitRecords.map((ex) => ex.id);

		if (exhibitIds.length > 0) {
			// Delete lightning talks
			await db
				.delete(lightningTalks)
				.where(inArray(lightningTalks.exhibitId, exhibitIds));

			// Delete member exhibits
			await db
				.delete(memberExhibits)
				.where(inArray(memberExhibits.exhibitId, exhibitIds));
		}

		// Delete member events
		await db.delete(memberEvents).where(eq(memberEvents.eventId, eventId));

		// Delete exhibits
		await db.delete(exhibits).where(eq(exhibits.eventId, eventId));

		// Delete event
		await db.delete(events).where(eq(events.id, eventId));
	}
}
