/**
 * 作業時間
 *
 * FDM原則に従い、null/undefinedに意味を持たせない。
 * 作業時間が記録されている場合と記録されていない場合を明示的に区別する。
 */
export type WorkDuration =
	| { readonly type: "recorded"; readonly minutes: number }
	| { readonly type: "notRecorded" };
