import type { FollowUpDestination } from "./FollowUpDestination";
import type { Resolution } from "./Resolution";
import type { WorkDuration } from "./WorkDuration";

/**
 * 対応事
 *
 * PC相談室での対応内容をまとめた値オブジェクト。
 * 担当メンバー、対応内容、解決ステータス、後処理先、作業時間を含む。
 */
export type Response = {
	/** 担当メンバーID一覧 */
	readonly assignedMemberIds: readonly string[];
	/** 対応内容 */
	readonly responseContent: string;
	/** 解決ステータス */
	readonly resolution: Resolution;
	/** 後処理先 */
	readonly followUpDestination?: FollowUpDestination;
	/** 作業時間 */
	readonly workDuration: WorkDuration;
};
