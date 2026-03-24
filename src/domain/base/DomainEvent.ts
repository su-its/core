/** ドメインイベントの基底型 — 全イベントが持つ共通フィールド */
export type DomainEvent = {
	readonly eventName: string;
	readonly occurredAt: Date;
};
