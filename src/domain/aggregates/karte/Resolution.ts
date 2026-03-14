import type { Recorded } from "./Recorded";
import type { FollowUp } from "./FollowUp";

/**
 * 解決ステータス — 相談が解決したかどうか
 *
 * 未解決の場合、後処理は過去データでは未記録の場合がある。
 * FDM原則に従い、Recorded型で明示する。
 */
export type Resolution =
	| { readonly type: "resolved" }
	| {
			readonly type: "unresolved";
			/** 後処理 */
			readonly followUp: Recorded<FollowUp>;
	  };
