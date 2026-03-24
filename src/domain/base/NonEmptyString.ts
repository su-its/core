import { EmptyStringException } from "#domain/exceptions";

/**
 * 空でない文字列 — 空文字・空白のみの文字列を型レベルで禁止する
 */
export type NonEmptyString = string & { readonly __brand: unique symbol };

/** 空でない文字列を生成する — 空文字・空白のみなら例外 */
export function nonEmptyString(
	value: string,
	fieldName?: string,
): NonEmptyString {
	const trimmed = value.trim();
	if (trimmed.length === 0) {
		throw new EmptyStringException(fieldName);
	}
	return trimmed as NonEmptyString;
}
