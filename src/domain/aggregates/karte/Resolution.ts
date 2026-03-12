import type { FollowUpDestination } from "./FollowUpDestination";

/**
 * 解決ステータス — 相談が解決したかどうか
 *
 * 未解決の場合は後処理先が必須。
 * FDM原則に従い、optional fieldを排除する。
 */
export type Resolution =
	| { readonly type: "resolved" }
	| {
			readonly type: "unresolved";
			/** 後処理先 */
			readonly followUpDestination: FollowUpDestination;
	  };
