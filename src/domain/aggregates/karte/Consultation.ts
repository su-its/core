import type { ConsultationCategory } from "./ConsultationCategory";

/**
 * 相談事
 *
 * 相談者が持ち込んだトラブルの内容をまとめた値オブジェクト。
 * カテゴリは複数選択可能。
 */
export type Consultation = {
	/** 相談カテゴリ（複数選択可） */
	readonly categories: readonly ConsultationCategory[];
	/** 対象機器 */
	readonly targetDevice: string;
	/** トラブル詳細 */
	readonly troubleDetails: string;
};
