import type { NonEmptyArray } from "#domain/base/NonEmptyArray";
import type { Assignee } from "./Assignee.ts";
import type { Recorded } from "./Recorded.ts";
import type { Resolution } from "./Resolution.ts";
import type { WorkDuration } from "./WorkDuration.ts";

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
