import { eq } from "drizzle-orm";
import {
	Department,
	DiscordAccount,
	Email,
	Member,
	type MemberRepository,
	UniversityEmail,
} from "../../domain";
import { getDb } from "./client";
import { discordAccounts, members } from "./schema";

type MemberWithDiscordAccounts = typeof members.$inferSelect & {
	discordAccounts: (typeof discordAccounts.$inferSelect)[];
};

export class DrizzleMemberRepository implements MemberRepository {
	private toDomain(record: MemberWithDiscordAccounts): Member {
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
		const db = getDb();
		const discordAccount = await db.query.discordAccounts.findFirst({
			where: eq(discordAccounts.id, discordAccountId),
		});

		if (!discordAccount) return null;

		return this.findById(discordAccount.memberId);
	}

	async findById(id: string): Promise<Member | null> {
		const db = getDb();
		const record = await db.query.members.findFirst({
			where: eq(members.id, id),
			with: { discordAccounts: true },
		});

		if (!record) return null;

		return this.toDomain(record);
	}

	async findByEmail(email: string): Promise<Member | null> {
		const db = getDb();
		const record = await db.query.members.findFirst({
			where: eq(members.email, email),
			with: { discordAccounts: true },
		});

		if (!record) return null;

		return this.toDomain(record);
	}

	async findByStudentId(studentId: string): Promise<Member | null> {
		const db = getDb();
		const record = await db.query.members.findFirst({
			where: eq(members.studentId, studentId),
			with: { discordAccounts: true },
		});

		if (!record) return null;

		return this.toDomain(record);
	}

	async findAll(): Promise<Member[]> {
		const db = getDb();
		const records = await db.query.members.findMany({
			with: { discordAccounts: true },
		});

		return records.map((record) => this.toDomain(record));
	}

	async save(member: Member): Promise<void> {
		const db = getDb();
		const memberSnapshot = member.toSnapshot();

		await db
			.insert(members)
			.values({
				id: memberSnapshot.id,
				name: memberSnapshot.name,
				studentId: memberSnapshot.studentId,
				department: memberSnapshot.department.getValue(),
				email: memberSnapshot.email.getValue(),
				personalEmail: memberSnapshot.personalEmail?.getValue() ?? null,
				updatedAt: new Date(),
			})
			.onConflictDoUpdate({
				target: members.id,
				set: {
					name: memberSnapshot.name,
					studentId: memberSnapshot.studentId,
					department: memberSnapshot.department.getValue(),
					email: memberSnapshot.email.getValue(),
					personalEmail: memberSnapshot.personalEmail?.getValue() ?? null,
					updatedAt: new Date(),
				},
			});

		for (const discordAccount of memberSnapshot.discordAccounts) {
			await db
				.insert(discordAccounts)
				.values({
					id: discordAccount.id,
					nickName: discordAccount.nickName,
					memberId: discordAccount.memberId,
					updatedAt: new Date(),
				})
				.onConflictDoUpdate({
					target: discordAccounts.id,
					set: {
						nickName: discordAccount.nickName,
						updatedAt: new Date(),
					},
				});
		}
	}

	async delete(memberId: string): Promise<void> {
		const db = getDb();

		await db
			.delete(discordAccounts)
			.where(eq(discordAccounts.memberId, memberId));
		await db.delete(members).where(eq(members.id, memberId));
	}
}
