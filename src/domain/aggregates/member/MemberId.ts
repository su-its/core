/** 室員ID — Member集約ルートを一意に識別するブランド型 */
export type MemberId = string & { readonly __brand: unique symbol };

export function memberId(value: string): MemberId {
	return value as MemberId;
}
