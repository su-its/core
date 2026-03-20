import type { UniversityEmail } from "#domain/aggregates/member/UniversityEmail";
import type { DomainEvent } from "#domain/base/DomainEvent";

/** 対応する外部サービス */
export type ServiceName = "discord";

/** 外部サービスを紐付けた */
export class ExternalServiceLinked implements DomainEvent {
	readonly eventName = "ExternalServiceLinked" as const;
	constructor(
		readonly personEmail: UniversityEmail,
		readonly serviceName: ServiceName,
		readonly userId: string,
		readonly occurredAt: Date,
	) {}
}

export type ExternalServiceLinkDomainEvent = ExternalServiceLinked;

/**
 * 外部サービス連携 — 外部サービスとのアカウント紐付けを表す
 *
 * 識別子: サービス名 + ユーザーID
 * 人コンテキストとは大学メールアドレスで疎結合に参照する。
 */
export class ExternalServiceLink {
	constructor(
		readonly serviceName: ServiceName,
		readonly userId: string,
		readonly personEmail: UniversityEmail,
		private readonly domainEvents: readonly ExternalServiceLinkDomainEvent[] = [],
	) {}

	static link(
		serviceName: ServiceName,
		userId: string,
		personEmail: UniversityEmail,
	): ExternalServiceLink {
		return new ExternalServiceLink(serviceName, userId, personEmail, [
			new ExternalServiceLinked(personEmail, serviceName, userId, new Date()),
		]);
	}

	static reconstruct(
		serviceName: ServiceName,
		userId: string,
		personEmail: UniversityEmail,
	): ExternalServiceLink {
		return new ExternalServiceLink(serviceName, userId, personEmail);
	}

	pullDomainEvents(): readonly ExternalServiceLinkDomainEvent[] {
		return [...this.domainEvents];
	}
}
