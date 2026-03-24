/** カルテID — カルテを一意に識別するブランド型 */
export type KarteId = string & { readonly __brand: unique symbol };

export function karteId(value: string): KarteId {
	return value as KarteId;
}
