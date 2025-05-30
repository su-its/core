import { type Prisma, PrismaClient } from "@prisma/client";
import {
	Department,
	DiscordAccount,
	Email,
	Member,
	type MemberRepository,
	UniversityEmail,
} from "../../domain";

const prisma = new PrismaClient();

type PrismaMemberWithDiscord = Prisma.MemberGetPayload<{
	include: { discordAccounts: true };
}>;

export class PrismaMemberRepository implements MemberRepository {
	private toDomain(record: PrismaMemberWithDiscord): Member {
		const member = new Member(
			record.id,
			record.name,
			record.studentId,
			Department.fromString(record.department),
			new UniversityEmail(record.email),
			record.personalEmail ? new Email(record.personalEmail) : undefined,
		);

		for (const discordAccount of record.discordAccounts) {
			member.addDiscordAccount(
				new DiscordAccount(
					discordAccount.id,
					discordAccount.nickName,
					discordAccount.memberId,
				),
			);
		}

		return member;
	}

	async findByDiscordAccountId(
		discordAccountId: string,
	): Promise<Member | null> {
		const record = await prisma.member.findFirst({
			where: { discordAccounts: { some: { id: discordAccountId } } },
			include: { discordAccounts: true },
		});

		if (!record) return null;

		return this.toDomain(record);
	}

	async findById(id: string): Promise<Member | null> {
		const record = await prisma.member.findUnique({
			where: { id },
			include: { discordAccounts: true },
		});

		if (!record) return null;

		return this.toDomain(record);
	}

	async findByEmail(email: string): Promise<Member | null> {
		const record = await prisma.member.findUnique({
			where: { email },
			include: { discordAccounts: true },
		});

		if (!record) return null;

		return this.toDomain(record);
	}

	async findByStudentId(studentId: string): Promise<Member | null> {
		const record = await prisma.member.findFirst({
			where: { studentId },
			include: { discordAccounts: true },
		});

		if (!record) return null;

		return this.toDomain(record);
	}

	async findAll(): Promise<Member[]> {
		const records = await prisma.member.findMany({
			include: { discordAccounts: true },
		});

		return records.map(this.toDomain);
	}

	async save(member: Member): Promise<void> {
		const memberSnapshot = member.toSnapshot();
		await prisma.member.upsert({
			where: { id: memberSnapshot.id },
			update: {
				name: memberSnapshot.name,
				studentId: memberSnapshot.studentId,
				department: memberSnapshot.department.toString(),
				email: memberSnapshot.email.getValue(),
				personalEmail: memberSnapshot.personalEmail?.getValue(),
			},
			create: {
				id: memberSnapshot.id,
				name: memberSnapshot.name,
				studentId: memberSnapshot.studentId,
				department: memberSnapshot.department.toString(),
				email: memberSnapshot.email.getValue(),
				personalEmail: memberSnapshot.personalEmail?.getValue(),
			},
		});

		for (const discordAccount of memberSnapshot.discordAccounts) {
			await prisma.discordAccount.upsert({
				where: { id: discordAccount.id },
				update: { nickName: discordAccount.nickName },
				create: {
					id: discordAccount.id,
					nickName: discordAccount.nickName,
					memberId: discordAccount.memberId,
				},
			});
		}
	}

	async delete(memberId: string): Promise<void> {
		await prisma.discordAccount.deleteMany({
			where: { memberId },
		});

		await prisma.member.delete({
			where: { id: memberId },
		});
	}
}
