/** 後処理の選択肢一覧 */
export const FOLLOW_UP_OPTIONS = [
	"技術部",
	"生協",
	"情報基盤センター",
	"見送り",
	"学務課",
	"その他",
] as const;

/** 後処理 — 相談対応後のアクション */
export type FollowUp = (typeof FOLLOW_UP_OPTIONS)[number];
