import type { MemberId } from "#domain";
import type { DiscordAccount } from "./DiscordAccount";
import type { DiscordId } from "./DiscordId";

export interface DiscordAccountRepository {
	findByDiscordId(discordId: DiscordId): Promise<DiscordAccount | null>;
	findByMemberId(memberId: MemberId): Promise<DiscordAccount[]>;
	findAll(): Promise<DiscordAccount[]>;
	save(account: DiscordAccount): Promise<void>;
	delete(discordId: DiscordId): Promise<void>;
}
