import type { FollowUp } from "./FollowUp";
import type { Recorded } from "../../shared";

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

/** 解決ステータスの選択肢一覧 */
export const RESOLUTION_TYPES = [
	"resolved",
	"unresolved",
] as const satisfies readonly Resolution["type"][];
