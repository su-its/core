import { randomUUID } from "node:crypto";
import { eq, inArray } from "drizzle-orm";
import {
	Event,
	type EventId,
	type EventRepository,
	Exhibit,
	type ExhibitId,
	LightningTalk,
	LightningTalkDuration,
	type MemberId,
	Url,
	eventId,
	exhibitId,
	memberId,
} from "#domain";
import { type DrizzleDb, getDb } from "./client";
import {
	events,
	exhibits,
	lightningTalks,
	memberEvents,
	memberExhibits,
} from "./schema";

// ============================================================================
// Type Definitions - Using $inferSelect for schema-derived types
// ============================================================================

/** Exhibit with related data - matches Drizzle's relational query result */
type ExhibitWithRelations = typeof exhibits.$inferSelect & {
	lightningTalk: typeof lightningTalks.$inferSelect | null;
	memberExhibits: (typeof memberExhibits.$inferSelect)[];
};

/** Event with all related data - matches Drizzle's relational query result */
type EventWithRelations = typeof events.$inferSelect & {
	exhibits: ExhibitWithRelations[];
	memberEvents: (typeof memberEvents.$inferSelect)[];
};

// ============================================================================
// Repository Implementation
// ============================================================================

export class DrizzleEventRepository implements EventRepository {
	/**
	 * Converts a database record to a domain Event entity.
	 */
	private toDomain(record: EventWithRelations): Event {
		const event = new Event(
			eventId(record.id),
			record.name,
			new Date(record.date),
		);

		// Load event member IDs
		for (const memberEvent of record.memberEvents) {
			event.addMemberId(memberId(memberEvent.memberId));
		}

		// Load exhibits
		for (const exhibitRecord of record.exhibits) {
			const exhibit = this.createExhibitFromRecord(exhibitRecord);

			// Load exhibit member IDs
			for (const memberExhibit of exhibitRecord.memberExhibits) {
				exhibit.addMemberId(memberId(memberExhibit.memberId));
			}

			event.addExhibit(exhibit);
		}

		return event;
	}

	/**
	 * Creates an Exhibit domain entity from a database record.
	 */
	private createExhibitFromRecord(record: ExhibitWithRelations): Exhibit {
		if (record.lightningTalk) {
			const lt = record.lightningTalk;
			const lightningTalk = new LightningTalk(
				exhibitId(lt.exhibitId),
				new Date(lt.startTime),
				new LightningTalkDuration(lt.duration),
				lt.slideUrl ? new Url(lt.slideUrl) : undefined,
			);

			return Exhibit.createWithLightningTalk(
				exhibitId(record.id),
				record.name,
				lightningTalk,
				record.description ?? undefined,
				record.markdownContent ?? undefined,
				record.url ? new Url(record.url) : undefined,
			);
		}

		return new Exhibit(
			exhibitId(record.id),
			record.name,
			record.description ?? undefined,
			record.markdownContent ?? undefined,
			record.url ? new Url(record.url) : undefined,
		);
	}

	// ==========================================================================
	// Persistence Methods
	// ==========================================================================

	private async persistEvent(event: Event): Promise<void> {
		const db = getDb();
		const snapshot = event.toSnapshot();
		const now = new Date().toISOString();
		const dateStr =
			snapshot.date instanceof Date
				? snapshot.date.toISOString()
				: snapshot.date;

		// 1) Event upsert
		await db
			.insert(events)
			.values({
				id: snapshot.id,
				name: snapshot.name,
				date: dateStr,
				updatedAt: now,
			})
			.onConflictDoUpdate({
				target: events.id,
				set: {
					name: snapshot.name,
					date: dateStr,
					updatedAt: now,
				},
			});

		// 2) Find obsolete exhibits and clean up
		const snapshotExhibitIds = snapshot.exhibits.map((ex) => ex.id);
		await this.deleteObsoleteExhibits(db, snapshot.id, snapshotExhibitIds);

		// 3) Upsert exhibits
		for (const ex of snapshot.exhibits) {
			await this.upsertExhibit(db, snapshot.id, ex);
		}

		// 4) Sync member events
		await this.syncMemberEvents(db, snapshot.id, event.getMemberIds());

		// 5) Sync member exhibits
		for (const exhibitDomain of event.getExhibits()) {
			await this.syncMemberExhibits(
				db,
				exhibitDomain.id,
				exhibitDomain.getMemberIds(),
			);
		}
	}

	private async deleteObsoleteExhibits(
		db: DrizzleDb,
		eventId: EventId,
		keptExhibitIds: ExhibitId[],
	): Promise<void> {
		const existingExhibits = await db
			.select({ id: exhibits.id })
			.from(exhibits)
			.where(eq(exhibits.eventId, eventId));

		const existingIdSet = new Set(existingExhibits.map((r) => exhibitId(r.id)));
		const keptIdSet = new Set(keptExhibitIds);
		const obsoleteIds = [...existingIdSet].filter((id) => !keptIdSet.has(id));

		if (obsoleteIds.length > 0) {
			await db
				.delete(lightningTalks)
				.where(inArray(lightningTalks.exhibitId, obsoleteIds));
			await db
				.delete(memberExhibits)
				.where(inArray(memberExhibits.exhibitId, obsoleteIds));
			await db.delete(exhibits).where(inArray(exhibits.id, obsoleteIds));
		}
	}

	private async upsertExhibit(
		db: DrizzleDb,
		eventId: EventId,
		ex: ReturnType<Event["toSnapshot"]>["exhibits"][number],
	): Promise<void> {
		const now = new Date().toISOString();
		await db
			.insert(exhibits)
			.values({
				id: ex.id,
				name: ex.name,
				description: ex.description ?? null,
				markdownContent: ex.markdownContent ?? null,
				url: ex.url?.getValue() ?? null,
				eventId: eventId,
				updatedAt: now,
			})
			.onConflictDoUpdate({
				target: exhibits.id,
				set: {
					name: ex.name,
					description: ex.description ?? null,
					markdownContent: ex.markdownContent ?? null,
					url: ex.url?.getValue() ?? null,
					updatedAt: now,
				},
			});

		if (ex.lightningTalk) {
			const startTimeStr =
				ex.lightningTalk.startTime instanceof Date
					? ex.lightningTalk.startTime.toISOString()
					: ex.lightningTalk.startTime;
			await db
				.insert(lightningTalks)
				.values({
					exhibitId: ex.id,
					startTime: startTimeStr,
					duration: ex.lightningTalk.durationMinutes.getValue(),
					slideUrl: ex.lightningTalk.slideUrl?.getValue() ?? null,
					updatedAt: now,
				})
				.onConflictDoUpdate({
					target: lightningTalks.exhibitId,
					set: {
						startTime: startTimeStr,
						duration: ex.lightningTalk.durationMinutes.getValue(),
						slideUrl: ex.lightningTalk.slideUrl?.getValue() ?? null,
						updatedAt: now,
					},
				});
		} else {
			await db
				.delete(lightningTalks)
				.where(eq(lightningTalks.exhibitId, ex.id));
		}
	}

	private async syncMemberEvents(
		db: DrizzleDb,
		eventId: EventId,
		memberIds: MemberId[],
	): Promise<void> {
		await db.delete(memberEvents).where(eq(memberEvents.eventId, eventId));

		const now = new Date().toISOString();
		for (const memberId of memberIds) {
			await db
				.insert(memberEvents)
				.values({
					id: randomUUID(),
					memberId,
					eventId,
					updatedAt: now,
				})
				.onConflictDoNothing();
		}
	}

	private async syncMemberExhibits(
		db: DrizzleDb,
		exhibitId: ExhibitId,
		memberIds: MemberId[],
	): Promise<void> {
		await db
			.delete(memberExhibits)
			.where(eq(memberExhibits.exhibitId, exhibitId));

		const now = new Date().toISOString();
		for (const memberId of memberIds) {
			await db
				.insert(memberExhibits)
				.values({
					id: randomUUID(),
					memberId,
					exhibitId,
					updatedAt: now,
				})
				.onConflictDoNothing();
		}
	}

	// ==========================================================================
	// Query Methods
	// ==========================================================================

	async findById(id: EventId): Promise<Event | null> {
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

	async findByParticipantMemberId(memberId: MemberId): Promise<Event[]> {
		const db = getDb();

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

	async findByExhibitId(exhibitId: ExhibitId): Promise<Event | null> {
		const db = getDb();

		const exhibit = await db
			.select({ eventId: exhibits.eventId })
			.from(exhibits)
			.where(eq(exhibits.id, exhibitId))
			.limit(1);

		if (exhibit.length === 0) return null;
		return this.findById(eventId(exhibit[0].eventId));
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

	async delete(eventId: EventId): Promise<void> {
		const db = getDb();

		const exhibitRecords = await db
			.select({ id: exhibits.id })
			.from(exhibits)
			.where(eq(exhibits.eventId, eventId));
		const exhibitIds = exhibitRecords.map((ex) => ex.id);

		if (exhibitIds.length > 0) {
			await db
				.delete(lightningTalks)
				.where(inArray(lightningTalks.exhibitId, exhibitIds));
			await db
				.delete(memberExhibits)
				.where(inArray(memberExhibits.exhibitId, exhibitIds));
		}

		await db.delete(memberEvents).where(eq(memberEvents.eventId, eventId));
		await db.delete(exhibits).where(eq(exhibits.eventId, eventId));
		await db.delete(events).where(eq(events.id, eventId));
	}
}
