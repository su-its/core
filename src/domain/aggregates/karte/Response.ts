import type { Resolution } from "./Resolution";
import type { WorkDuration } from "./WorkDuration";

/**
 * 対応事
 *
 * PC相談室での対応内容をまとめた値オブジェクト。
 * 担当メンバー、対応内容、解決ステータス、作業時間を含む。
 */
export type Response = {
	/** 担当メンバーID一覧 */
	readonly assignedMemberIds: readonly string[];
	/** 対応内容 */
	readonly responseContent: string;
	/** 解決ステータス */
	readonly resolution: Resolution;
	/** 作業時間 */
	readonly workDuration: WorkDuration;
};
