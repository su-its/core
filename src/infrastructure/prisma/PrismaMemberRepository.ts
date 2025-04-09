import { Member } from "@/domain/member/Member";
import type { MemberRepository } from "@/domain/member/MemberRepository";
import type { Department } from "@/domain/value-objects/Departments";
import { Email } from "@/domain/value-objects/Email";
import { UniversityEmail } from "@/domain/value-objects/UniversityEmail";
import { type Prisma, PrismaClient } from "@prisma/client";

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
			record.department as Department,
			new UniversityEmail(record.email),
			record.personalEmail ? new Email(record.personalEmail) : undefined,
		);

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
		await prisma.member.upsert({
			where: { id: member.id },
			update: {
				name: member.name,
				studentId: member.studentId,
				department: member.department,
				email: member.email.getValue(),
				personalEmail: member.personalEmail?.getValue(),
			},
			create: {
				id: member.id,
				name: member.name,
				studentId: member.studentId,
				department: member.department,
				email: member.email.getValue(),
				personalEmail: member.personalEmail?.getValue(),
			},
		});

		for (const discordAccount of member.getDiscordAccounts()) {
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
