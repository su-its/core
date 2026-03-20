import type { UniversityEmail } from "#domain/aggregates/member/UniversityEmail";
import type { DomainEvent } from "#domain/base/DomainEvent";

/** 外部サービスを紐付けた */
export class ExternalServiceLinked implements DomainEvent {
	readonly eventName = "ExternalServiceLinked" as const;
	constructor(
		readonly personEmail: UniversityEmail,
		readonly serviceName: string,
		readonly userId: string,
		readonly occurredAt: Date,
	) {}
}

/** 外部サービスの紐付けを解除した */
export class ExternalServiceUnlinked implements DomainEvent {
	readonly eventName = "ExternalServiceUnlinked" as const;
	constructor(
		readonly personEmail: UniversityEmail,
		readonly serviceName: string,
		readonly userId: string,
		readonly occurredAt: Date,
	) {}
}

export type ExternalServiceLinkDomainEvent =
	| ExternalServiceLinked
	| ExternalServiceUnlinked;

/**
 * 外部サービス連携 — 外部サービスとのアカウント紐付けを表す
 *
 * 識別子: サービス名 + ユーザーID
 * 人コンテキストとは大学メールアドレスで疎結合に参照する。
 */
export class ExternalServiceLink {
	constructor(
		readonly serviceName: string,
		readonly userId: string,
		readonly personEmail: UniversityEmail,
		private readonly domainEvents: readonly ExternalServiceLinkDomainEvent[] = [],
	) {}

	static link(
		serviceName: string,
		userId: string,
		personEmail: UniversityEmail,
	): ExternalServiceLink {
		return new ExternalServiceLink(serviceName, userId, personEmail, [
			new ExternalServiceLinked(personEmail, serviceName, userId, new Date()),
		]);
	}

	static reconstruct(
		serviceName: string,
		userId: string,
		personEmail: UniversityEmail,
	): ExternalServiceLink {
		return new ExternalServiceLink(serviceName, userId, personEmail);
	}

	pullDomainEvents(): readonly ExternalServiceLinkDomainEvent[] {
		return [...this.domainEvents];
	}
}
