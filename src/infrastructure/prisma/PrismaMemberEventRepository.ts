import { PrismaClient } from "@prisma/client";
import type { MemberEvent as PrismaMemberEvent } from "@prisma/client";
import { MemberEvent } from "../../domain/aggregates/memberEvent/MemberEvent";
import type { MemberEventRepository } from "../../domain/aggregates/memberEvent/MemberEventRepository";

const prisma = new PrismaClient();

export class PrismaMemberEventRepository implements MemberEventRepository {
	private toDomain(record: PrismaMemberEvent): MemberEvent {
		return new MemberEvent(record.id, record.memberId, record.eventId);
	}

	async findById(id: string): Promise<MemberEvent | null> {
		const record = await prisma.memberEvent.findUnique({ where: { id } });
		if (!record) return null;
		return this.toDomain(record);
	}

	async findByMemberId(memberId: string): Promise<MemberEvent[]> {
		const records = await prisma.memberEvent.findMany({
			where: { memberId },
		});
		return records.map((r) => this.toDomain(r));
	}

	async findByEventId(eventId: string): Promise<MemberEvent[]> {
		const records = await prisma.memberEvent.findMany({
			where: { eventId },
		});
		return records.map((r) => this.toDomain(r));
	}

	async save(memberEvent: MemberEvent): Promise<void> {
		const snapshot = memberEvent.toSnapshot();
		await prisma.memberEvent.upsert({
			where: { id: snapshot.id },
			create: {
				id: snapshot.id,
				memberId: snapshot.memberId,
				eventId: snapshot.eventId,
			},
			update: {
				memberId: snapshot.memberId,
				eventId: snapshot.eventId,
			},
		});
	}

	async delete(id: string): Promise<void> {
		await prisma.memberEvent.delete({ where: { id } });
	}
}
