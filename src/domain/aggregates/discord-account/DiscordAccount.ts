import type { MemberId } from "#domain";
import type { DomainEvent } from "../../base";
import type { DiscordId } from "./DiscordId";

/** Discordアカウント紐付けイベント */
export type DiscordAccountLinked = DomainEvent & {
	readonly eventName: "DiscordAccountLinked";
	readonly discordId: DiscordId;
	readonly memberId: MemberId;
	readonly nickName: string;
};

/** ニックネーム変更イベント */
export type NickNameChanged = DomainEvent & {
	readonly eventName: "NickNameChanged";
	readonly discordId: DiscordId;
	readonly memberId: MemberId;
	readonly previousNickName: string;
	readonly newNickName: string;
};

export type DiscordAccountDomainEvent = DiscordAccountLinked | NickNameChanged;

/** DiscordAccountイベント名の選択肢一覧 */
export const DISCORD_ACCOUNT_EVENT_NAMES = [
	"DiscordAccountLinked",
	"NickNameChanged",
] as const satisfies readonly DiscordAccountDomainEvent["eventName"][];

/**
 * Discordアカウント — Discord連携の紐付けを表す
 *
 * 識別子: discordId
 * 人コンテキストとはMemberIdで参照する。
 */
export class DiscordAccount {
	constructor(
		readonly discordId: DiscordId,
		readonly memberId: MemberId,
		readonly nickName: string,
		private readonly domainEvents: readonly DiscordAccountDomainEvent[] = [],
	) {}

	static link(discordId: DiscordId, memberId: MemberId, nickName: string): DiscordAccount {
		return new DiscordAccount(discordId, memberId, nickName, [
			{
				eventName: "DiscordAccountLinked",
				discordId,
				memberId,
				nickName,
				occurredAt: new Date(),
			},
		]);
	}

	static reconstruct(discordId: DiscordId, memberId: MemberId, nickName: string): DiscordAccount {
		return new DiscordAccount(discordId, memberId, nickName);
	}

	changeNickName(newNickName: string): DiscordAccount {
		return new DiscordAccount(this.discordId, this.memberId, newNickName, [
			...this.domainEvents,
			{
				eventName: "NickNameChanged",
				discordId: this.discordId,
				memberId: this.memberId,
				previousNickName: this.nickName,
				newNickName,
				occurredAt: new Date(),
			},
		]);
	}

	getDomainEvents(): readonly DiscordAccountDomainEvent[] {
		return [...this.domainEvents];
	}
}
