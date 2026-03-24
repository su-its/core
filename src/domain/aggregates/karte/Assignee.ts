import type { MemberId } from "#domain";

/** システム上のメンバーに紐づく対応者 */
type ResolvedAssignee = {
	readonly type: "resolved";
	readonly memberId: MemberId;
};

/** メンバーに紐づかない対応者（過去データ等） */
type UnresolvedAssignee = {
	readonly type: "unresolved";
	readonly name: string;
};

/** 対応者 — カルテの対応を行った人 */
export type Assignee = ResolvedAssignee | UnresolvedAssignee;

/** 対応者種別の選択肢一覧 */
export const ASSIGNEE_TYPES = [
	"resolved",
	"unresolved",
] as const satisfies readonly Assignee["type"][];
