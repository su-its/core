import type { NonEmptyArray } from "#domain/base/NonEmptyArray";
import type { MemberId } from "#domain/aggregates/member/MemberId";
import type { Recorded } from "./Recorded";
import type { Resolution } from "./Resolution";
import type { WorkDuration } from "./WorkDuration";

/**
 * 対応記録
 *
 * 相談に対して行った対応の記録。
 * 担当メンバー・解決ステータスは過去データで未記録の場合がある。
 */
export type SupportRecord = {
	/** 担当メンバーID一覧 */
	readonly assignedMemberIds: Recorded<NonEmptyArray<MemberId>>;
	/** 対応内容 */
	readonly content: string;
	/** 解決ステータス */
	readonly resolution: Recorded<Resolution>;
	/** 作業時間 */
	readonly workDuration: Recorded<WorkDuration>;
};
