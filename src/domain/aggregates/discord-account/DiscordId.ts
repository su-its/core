/** Discord ID — Discordアカウントを一意に識別するブランド型（Snowflake形式） */
export type DiscordId = string & { readonly __brand: unique symbol };

export function discordId(value: string): DiscordId {
	return value as DiscordId;
}
