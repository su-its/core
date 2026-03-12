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
	readonly assignedMemberIds: readonly string[];
	readonly responseContent: string;
	readonly resolution: Resolution;
	readonly followUpDestination?: FollowUpDestination;
	readonly workDuration: WorkDuration;
};
