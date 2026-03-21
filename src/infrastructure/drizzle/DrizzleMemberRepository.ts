import { eq } from "drizzle-orm";
import {
	Department,
	DiscordAccount,
	Email,
	Member,
	type MemberId,
	type MemberRepository,
	StudentId,
	UniversityEmail,
	memberId,
} from "#domain";
import { getDb } from "./client";
import { discordAccounts, members } from "./schema";

// ============================================================================
// Repository Implementation
// ============================================================================

export class DrizzleMemberRepository implements MemberRepository {
	/**
	 * Converts a database record to a domain Member entity.
	 * Accepts the exact type returned by Drizzle's relational query.
	 */
	private toDomain(
		record: typeof members.$inferSelect & {
			discordAccounts: (typeof discordAccounts.$inferSelect)[];
		},
	): Member {
		const member = new Member(
			memberId(record.id),
			record.name,
			StudentId.fromString(record.studentId),
			Department.fromString(record.department),
			new UniversityEmail(record.email),
			record.personalEmail ? new Email(record.personalEmail) : undefined,
		);

		for (const discordAccount of record.discordAccounts) {
			member.addDiscordAccount(
				new DiscordAccount(
					discordAccount.discordId,
					discordAccount.nickName,
					memberId(discordAccount.memberId),
				),
			);
		}

		return member;
	}

	// ==========================================================================
	// Query Methods
	// ==========================================================================

	async findByDiscordAccountId(
		discordAccountId: string,
	): Promise<Member | null> {
		const db = getDb();
		const discordAccount = await db.query.discordAccounts.findFirst({
			where: eq(discordAccounts.discordId, discordAccountId),
		});

		if (!discordAccount) return null;
		return this.findById(memberId(discordAccount.memberId));
	}

	async findById(id: MemberId): Promise<Member | null> {
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

	// ==========================================================================
	// Persistence Methods
	// ==========================================================================

	async save(member: Member): Promise<void> {
		const db = getDb();
		const snapshot = member.toSnapshot();

		// Upsert member
		const now = new Date().toISOString();
		await db
			.insert(members)
			.values({
				id: snapshot.id,
				name: snapshot.name,
				studentId: snapshot.studentId,
				department: snapshot.department.getValue(),
				email: snapshot.email.getValue(),
				personalEmail: snapshot.personalEmail?.getValue() ?? null,
				updatedAt: now,
			})
			.onConflictDoUpdate({
				target: members.id,
				set: {
					name: snapshot.name,
					studentId: snapshot.studentId,
					department: snapshot.department.getValue(),
					email: snapshot.email.getValue(),
					personalEmail: snapshot.personalEmail?.getValue() ?? null,
					updatedAt: now,
				},
			});

		// Upsert discord accounts
		for (const discordAccount of snapshot.discordAccounts) {
			await db
				.insert(discordAccounts)
				.values({
					discordId: discordAccount.id,
					nickName: discordAccount.nickName,
					memberId: discordAccount.memberId,
					updatedAt: now,
				})
				.onConflictDoUpdate({
					target: discordAccounts.discordId,
					set: {
						nickName: discordAccount.nickName,
						updatedAt: now,
					},
				});
		}
	}

	async delete(id: MemberId): Promise<void> {
		const db = getDb();

		await db
			.delete(discordAccounts)
			.where(eq(discordAccounts.memberId, id));
		await db.delete(members).where(eq(members.id, id));
	}
}
