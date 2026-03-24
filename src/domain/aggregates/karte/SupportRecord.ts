import type { NonEmptyArray } from "../../base";
import type { Recorded } from "../../shared";
import type { Assignee } from "./Assignee";
import type { Resolution } from "./Resolution";
import type { WorkDuration } from "./WorkDuration";

/**
 * 対応記録
 *
 * 相談に対して行った対応の記録。
 * 過去データでは各フィールドが未記録の場合がある。
 */
export type SupportRecord = {
	/** 対応者一覧 */
	readonly assignees: Recorded<NonEmptyArray<Assignee>>;
	/** 対応内容 */
	readonly content: Recorded<string>;
	/** 解決ステータス */
	readonly resolution: Recorded<Resolution>;
	/** 作業時間 */
	readonly workDuration: Recorded<WorkDuration>;
};
