import type { NonEmptyArray } from "#domain/base/NonEmptyArray";
import type { ConsultationCategory } from "./ConsultationCategory";
import type { Recorded } from "./Recorded";

/**
 * 相談事
 *
 * 相談者が持ち込んだトラブルの内容をまとめた値オブジェクト。
 * 過去データでは各フィールドが未記録の場合がある。
 */
export type Consultation = {
	/** 相談カテゴリ（複数選択可） */
	readonly categories: Recorded<NonEmptyArray<ConsultationCategory>>;
	/** 対象機器 */
	readonly targetDevice: Recorded<string>;
	/** トラブル詳細 */
	readonly troubleDetails: Recorded<string>;
};
