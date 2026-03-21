/** 展示ID — Exhibitエンティティを一意に識別するブランド型 */
export type ExhibitId = string & { readonly __brand: unique symbol };

export function exhibitId(value: string): ExhibitId {
	return value as ExhibitId;
}
