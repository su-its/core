import type { ConsultationCategory } from "./ConsultationCategory";

/**
 * 相談事
 *
 * 相談者が持ち込んだトラブルの内容をまとめた値オブジェクト。
 * カテゴリは複数選択可能。
 */
export type Consultation = {
	readonly categories: readonly ConsultationCategory[];
	readonly targetDevice: string;
	readonly troubleDetails: string;
};
