/** イベントID — Event集約ルートを一意に識別するブランド型 */
export type EventId = string & { readonly __brand: unique symbol };

export function eventId(value: string): EventId {
	return value as EventId;
}
