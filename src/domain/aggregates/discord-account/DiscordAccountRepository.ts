import type { MemberId } from "#domain/aggregates/member/MemberId";
import type { DiscordAccount } from "./DiscordAccount.ts";
import type { DiscordId } from "./DiscordId.ts";

export interface DiscordAccountRepository {
	findByDiscordId(discordId: DiscordId): Promise<DiscordAccount | null>;
	findByMemberId(memberId: MemberId): Promise<DiscordAccount[]>;
	save(account: DiscordAccount): Promise<void>;
	delete(discordId: DiscordId): Promise<void>;
}
