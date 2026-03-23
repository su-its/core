import type { MemberId } from "#domain/aggregates/member/MemberId";
import type { DomainEvent } from "#domain/base/DomainEvent";
import type { DiscordId } from "./DiscordId";

/** Discordアカウント紐付けイベント */
export class DiscordAccountLinked implements DomainEvent {
	readonly eventName = "DiscordAccountLinked" as const;
	constructor(
		readonly discordId: DiscordId,
		readonly memberId: MemberId,
		readonly nickName: string,
		readonly occurredAt: Date,
	) {}
}

export type DiscordAccountDomainEvent = DiscordAccountLinked;

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
			new DiscordAccountLinked(discordId, memberId, nickName, new Date()),
		]);
	}

	static reconstruct(discordId: DiscordId, memberId: MemberId, nickName: string): DiscordAccount {
		return new DiscordAccount(discordId, memberId, nickName);
	}

	changeNickName(newNickName: string): DiscordAccount {
		return new DiscordAccount(this.discordId, this.memberId, newNickName, this.domainEvents);
	}

	getDomainEvents(): readonly DiscordAccountDomainEvent[] {
		return [...this.domainEvents];
	}
}
