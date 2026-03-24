/**
 * 1つ以上の要素を持つ読み取り専用配列
 *
 * 空配列を型レベルで禁止する。
 */
export type NonEmptyArray<T> = readonly [T, ...T[]];
