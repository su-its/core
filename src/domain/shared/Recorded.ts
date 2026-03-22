/**
 * 記録有無を明示する型
 *
 * FDM原則に従い、null/undefinedに意味を持たせない。
 * 過去データで記録されていない可能性があるフィールドに使用する。
 */
export type Recorded<T> =
	| {
			readonly type: "recorded";
			readonly value: T;
	  }
	| { readonly type: "notRecorded" };

/** 記録済みの値を生成する */
export function recorded<T>(value: T): Recorded<T> {
	return { type: "recorded", value };
}

/** 未記録を生成する */
export function notRecorded<T>(): Recorded<T> {
	return { type: "notRecorded" };
}
