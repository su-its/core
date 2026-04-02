import { v4 as uuid } from "uuid";
import { eq } from "drizzle-orm";
import {
	DiscordAccount,
	type DiscordAccountRepository,
	type DiscordId,
	type MemberId,
	discordId,
	memberId,
} from "#domain";
import { getClient } from "./client";
import { discordAccountDomainEvents, discordAccounts } from "./schema";
import { serializeDiscordAccountEventPayload } from "./serializeDiscordAccountEvent";

type DiscordAccountRow = typeof discordAccounts.$inferSelect;

function toDomain(row: DiscordAccountRow): DiscordAccount {
	return DiscordAccount.reconstruct(discordId(row.discordId), memberId(row.memberId), row.nickName);
}

export class DrizzleDiscordAccountRepository implements DiscordAccountRepository {
	async findByDiscordId(id: DiscordId): Promise<DiscordAccount | null> {
		const db = getClient();
		const row = await db.query.discordAccounts.findFirst({
			where: eq(discordAccounts.discordId, id as string),
		});
		if (!row) return null;
		return toDomain(row);
	}

	async findByMemberId(id: MemberId): Promise<DiscordAccount[]> {
		const db = getClient();
		const rows = await db.query.discordAccounts.findMany({
			where: eq(discordAccounts.memberId, id as string),
		});
		return rows.map(toDomain);
	}

	async findAll(): Promise<DiscordAccount[]> {
		const db = getDb();
		const rows = await db.query.discordAccounts.findMany();
		return rows.map(toDomain);
	}

	async save(account: DiscordAccount): Promise<void> {
		const db = getClient();
		const now = new Date().toISOString();
		const events = account.getDomainEvents();

		await db.transaction(async (tx) => {
			await tx
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

			if (events.length > 0) {
				await tx.insert(discordAccountDomainEvents).values(
					events.map((event) => ({
						id: uuid(),
						discordId: event.discordId as string,
						memberId: event.memberId as string,
						eventName: event.eventName,
						payload: serializeDiscordAccountEventPayload(event),
						occurredAt: event.occurredAt.toISOString(),
					})),
				);
			}
		});
	}

	async delete(id: DiscordId): Promise<void> {
		const db = getClient();
		await db.delete(discordAccounts).where(eq(discordAccounts.discordId, id as string));
	}
}
