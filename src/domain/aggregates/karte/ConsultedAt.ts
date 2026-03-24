/**
 * 相談日時 — 精度付き時間表現
 *
 * 過去データでは日時の記録精度にばらつきがある。
 * 「年だけ判明」「日付まで判明」「日時まで判明」など、
 * わかっている粒度を型で明示し、不明な部分を推定値で埋めない。
 */

import { InvalidConsultedAtException } from "#domain/exceptions";

/** 年のみ判明 */
export type YearOnly = {
	readonly precision: "year";
	readonly year: number;
};

/** 年月まで判明 */
export type YearMonth = {
	readonly precision: "yearMonth";
	readonly year: number;
	readonly month: number; // 1–12
};

/** 日付まで判明（時刻不明） */
export type DateOnly = {
	readonly precision: "date";
	readonly value: Date;
};

/** 日時まで判明 */
export type DateTime = {
	readonly precision: "datetime";
	readonly value: Date;
};

/** 精度付き日時 */
export type ConsultedAt = YearOnly | YearMonth | DateOnly | DateTime;

/** 精度の選択肢一覧 */
export const CONSULTED_AT_PRECISIONS = [
	"year",
	"yearMonth",
	"date",
	"datetime",
] as const satisfies readonly ConsultedAt["precision"][];

// ============================================================================
// Factory functions
// ============================================================================

export function yearOnly(year: number): ConsultedAt {
	return { precision: "year", year };
}

export function yearMonth(year: number, month: number): ConsultedAt {
	if (month < 1 || month > 12) {
		throw new InvalidConsultedAtException(`月は1〜12の範囲: ${month}`);
	}
	return { precision: "yearMonth", year, month };
}

export function dateOnly(value: Date): ConsultedAt {
	return { precision: "date", value: new Date(value) };
}

export function dateTime(value: Date): ConsultedAt {
	return { precision: "datetime", value: new Date(value) };
}

// ============================================================================
// Utility
// ============================================================================

/**
 * 日付文字列から精度を自動判定して ConsultedAt を生成する
 *
 * - "2005"           → yearOnly
 * - "2005-02"        → yearMonth
 * - "2005-02-17"     → dateOnly
 * - "2005-02-17T10:00" or "2005/02/17 10:00:00" → dateTime
 */
export function parseConsultedAt(input: string): ConsultedAt {
	const trimmed = input.trim().replace(/\//g, "-");

	// YYYY のみ
	if (/^\d{4}$/.test(trimmed)) {
		return yearOnly(Number(trimmed));
	}

	// YYYY-MM
	if (/^\d{4}-\d{1,2}$/.test(trimmed)) {
		const [y, m] = trimmed.split("-").map(Number) as [number, number];
		return yearMonth(y, m);
	}

	// YYYY-MM-DD（時刻なし）— ゼロ埋め無しを正規化してからDateに渡す
	const dateMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
	if (dateMatch) {
		const isoDate = toIsoDateString(dateMatch[1], dateMatch[2], dateMatch[3]);
		return dateOnly(new Date(`${isoDate}T00:00:00`));
	}

	// 時刻を含む（ISO形式 or スペース区切り）— ゼロ埋め無しを正規化
	const normalized = trimmed.replace(" ", "T");
	const dtMatch = normalized.match(
		/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/,
	);
	if (dtMatch) {
		const isoDate = toIsoDateString(dtMatch[1], dtMatch[2], dtMatch[3]);
		const isoTime = [
			dtMatch[4].padStart(2, "0"),
			dtMatch[5].padStart(2, "0"),
			(dtMatch[6] ?? "00").padStart(2, "0"),
		].join(":");
		return dateTime(new Date(`${isoDate}T${isoTime}`));
	}

	// その他の形式はDateに委譲
	const parsed = new Date(normalized);
	if (Number.isNaN(parsed.getTime())) {
		throw new InvalidConsultedAtException(`日時のパースに失敗: "${input}"`);
	}
	return dateTime(parsed);
}

/** 年・月・日の文字列をゼロ埋めしてISO 8601形式に正規化する */
function toIsoDateString(y: string, m: string, d: string): string {
	return `${y.padStart(4, "0")}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}
