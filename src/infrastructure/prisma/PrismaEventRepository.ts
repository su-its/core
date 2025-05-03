import { type Prisma, PrismaClient } from "@prisma/client";
import type { EventRepository } from "../../domain/aggregates/event";
import { Event, Exhibit, LightningTalk } from "../../domain/aggregates/event";
import { LightningTalkDuration, Url } from "../../domain/value-objects";

const prisma = new PrismaClient();

/**
 * Prisma の Event + exhibits + lightningTalk をまとめて取得する型
 */
type PrismaEventWithExhibits = Prisma.EventGetPayload<{
	include: {
		exhibits: {
			include: { lightningTalk: true };
		};
	};
}>;

export class PrismaEventRepository implements EventRepository {
	/**
	 * Prisma の Record から ドメインの Event を構築
	 * Exhibit.createWithLightningTalk() を使用して lightningTalk を持つ Exhibit を生成
	 */
	private toDomain(record: PrismaEventWithExhibits): Event {
		const event = new Event(record.id, record.name, record.date);

		// exhibits をドメインに変換して追加
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

			event.addExhibit(exhibit);
		}

		return event;
	}

	/**
	 * DBへEventを保存するためのヘルパー
	 * Event, Exhibit, LightningTalk の upsert処理を行う
	 */
	private async persistEvent(event: Event): Promise<void> {
		const snapshot = event.toSnapshot();

		// 1) まず event を upsert
		await prisma.event.upsert({
			where: { id: snapshot.id },
			update: {
				name: snapshot.name,
				date: snapshot.date,
			},
			create: {
				id: snapshot.id,
				name: snapshot.name,
				date: snapshot.date,
			},
		});

		// 2) 既存 exhibits を削除（スナップショットに含まれないもののみ）
		const snapshotExhibitIds = snapshot.exhibits.map((ex) => ex.id);

		// lightningTalk を先に削除
		await prisma.lightningTalk.deleteMany({
			where: {
				exhibitId: {
					in: await this.findObsoleteExhibitIds(
						snapshot.id,
						snapshotExhibitIds,
					),
				},
			},
		});

		// exhibit 削除
		await prisma.exhibit.deleteMany({
			where: {
				eventId: snapshot.id,
				id: { notIn: snapshotExhibitIds },
			},
		});

		// 3) exhibits を upsert
		for (const ex of snapshot.exhibits) {
			await prisma.exhibit.upsert({
				where: { id: ex.id },
				create: {
					id: ex.id,
					name: ex.name,
					description: ex.description ?? null,
					markdownContent: ex.markdownContent ?? null,
					url: ex.url?.getValue() ?? null,
					eventId: snapshot.id,
				},
				update: {
					name: ex.name,
					description: ex.description ?? null,
					markdownContent: ex.markdownContent ?? null,
					url: ex.url?.getValue() ?? null,
				},
			});

			// LightningTalk
			if (ex.lightningTalk) {
				await prisma.lightningTalk.upsert({
					where: { exhibitId: ex.id },
					create: {
						exhibitId: ex.id,
						startTime: ex.lightningTalk.startTime,
						duration: ex.lightningTalk.durationMinutes.getValue(),
						slideUrl: ex.lightningTalk.slideUrl?.getValue() ?? null,
					},
					update: {
						startTime: ex.lightningTalk.startTime,
						duration: ex.lightningTalk.durationMinutes.getValue(),
						slideUrl: ex.lightningTalk.slideUrl?.getValue() ?? null,
					},
				});
			} else {
				// 存在していたら削除
				await prisma.lightningTalk.deleteMany({
					where: { exhibitId: ex.id },
				});
			}
		}
	}

	/**
	 * どの ExhibitID が消えたかを調べるヘルパー
	 */
	private async findObsoleteExhibitIds(
		eventId: string,
		keptExhibitIds: string[],
	): Promise<string[]> {
		// イベントに紐づく既存のExhibitIDを全て取得
		const existingIds = await prisma.exhibit.findMany({
			where: { eventId },
			select: { id: true },
		});
		const existingIdSet = new Set(existingIds.map((r) => r.id));

		// スナップショットに無いIDだけ抽出
		const keptIdSet = new Set(keptExhibitIds);
		return [...existingIdSet].filter((id) => !keptIdSet.has(id));
	}

	// =============== EventRepository 実装 ===============
	async findById(id: string): Promise<Event | null> {
		const record = await prisma.event.findUnique({
			where: { id },
			include: {
				exhibits: {
					include: { lightningTalk: true },
				},
			},
		});
		if (!record) return null;
		return this.toDomain(record);
	}

	async findAll(): Promise<Event[]> {
		const records = await prisma.event.findMany({
			include: {
				exhibits: {
					include: { lightningTalk: true },
				},
			},
		});
		return records.map((r) => this.toDomain(r));
	}

	async save(event: Event): Promise<void> {
		await this.persistEvent(event);
	}

	async delete(eventId: string): Promise<void> {
		// 先に lightningTalk を削除
		const exhibitIds = await prisma.exhibit.findMany({
			where: { eventId },
			select: { id: true },
		});
		await prisma.lightningTalk.deleteMany({
			where: {
				exhibitId: { in: exhibitIds.map((ex) => ex.id) },
			},
		});

		// exhibit 削除
		await prisma.exhibit.deleteMany({ where: { eventId } });

		// event 削除
		await prisma.event.delete({
			where: { id: eventId },
		});
	}
}
