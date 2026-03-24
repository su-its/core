import { eq } from "drizzle-orm";
import {
	DiscordAccount,
	type DiscordAccountRepository,
	type DiscordId,
	type MemberId,
	discordId,
	memberId,
} from "#domain";
import { getDb } from "./client";
import { discordAccounts } from "./schema";

type DiscordAccountRow = typeof discordAccounts.$inferSelect;

function toDomain(row: DiscordAccountRow): DiscordAccount {
	return DiscordAccount.reconstruct(
		discordId(row.discordId),
		memberId(row.memberId),
		row.nickName,
	);
}

export class DrizzleDiscordAccountRepository
	implements DiscordAccountRepository
{
	async findByDiscordId(id: DiscordId): Promise<DiscordAccount | null> {
		const db = getDb();
		const row = await db.query.discordAccounts.findFirst({
			where: eq(discordAccounts.discordId, id as string),
		});
		if (!row) return null;
		return toDomain(row);
	}

	async findByMemberId(id: MemberId): Promise<DiscordAccount[]> {
		const db = getDb();
		const rows = await db.query.discordAccounts.findMany({
			where: eq(discordAccounts.memberId, id as string),
		});
		return rows.map(toDomain);
	}

	async save(account: DiscordAccount): Promise<void> {
		const db = getDb();
		const now = new Date().toISOString();

		await db
			.insert(discordAccounts)
			.values({
				discordId: account.discordId as string,
				nickName: account.nickName,
				memberId: account.memberId as string,
				updatedAt: now,
			})
			.onConflictDoUpdate({
				target: discordAccounts.discordId,
				set: {
					nickName: account.nickName,
					updatedAt: now,
				},
			});
	}

	async delete(id: DiscordId): Promise<void> {
		const db = getDb();
		await db
			.delete(discordAccounts)
			.where(eq(discordAccounts.discordId, id as string));
	}
}
