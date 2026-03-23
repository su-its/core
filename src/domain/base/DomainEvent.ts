/**
 * ドメインイベントの基底インターフェース
 *
 * 集約内で発生した出来事を表現する。
 * 集約のメソッドがイベントを生成し、ユースケース層で取り出して利用する。
 */
export interface DomainEvent {
	readonly eventName: string;
	readonly occurredAt: Date;
}
