import { PrismaClient } from "@prisma/client";
import type { MemberExhibit as PrismaMemberExhibit } from "@prisma/client";
import { MemberExhibit } from "../../domain/aggregates/memberExhibit/MemberExhibit";
import type { MemberExhibitRepository } from "../../domain/aggregates/memberExhibit/MemberExhibitRepository";

const prisma = new PrismaClient();

export class PrismaMemberExhibitRepository implements MemberExhibitRepository {
	private toDomain(record: PrismaMemberExhibit): MemberExhibit {
		return new MemberExhibit(record.id, record.memberId, record.exhibitId);
	}

	async findById(id: string): Promise<MemberExhibit | null> {
		const record = await prisma.memberExhibit.findUnique({ where: { id } });
		if (!record) return null;
		return this.toDomain(record);
	}

	async findByMemberId(memberId: string): Promise<MemberExhibit[]> {
		const records = await prisma.memberExhibit.findMany({
			where: { memberId },
		});
		return records.map((r) => this.toDomain(r));
	}

	async findByExhibitId(exhibitId: string): Promise<MemberExhibit[]> {
		const records = await prisma.memberExhibit.findMany({
			where: { exhibitId },
		});
		return records.map((r) => this.toDomain(r));
	}

	async save(memberExhibit: MemberExhibit): Promise<void> {
		const snapshot = memberExhibit.toSnapshot();
		await prisma.memberExhibit.upsert({
			where: { id: snapshot.id },
			create: {
				id: snapshot.id,
				memberId: snapshot.memberId,
				exhibitId: snapshot.exhibitId,
			},
			update: {
				memberId: snapshot.memberId,
				exhibitId: snapshot.exhibitId,
			},
		});
	}

	async delete(id: string): Promise<void> {
		await prisma.memberExhibit.delete({ where: { id } });
	}
}
