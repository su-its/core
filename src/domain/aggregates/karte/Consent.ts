/**
 * 同意事項
 *
 * カルテ記録における免責同意と情報公開同意をまとめた値オブジェクト。
 * カルテは同意なしでも作成できるため、各フィールドはbooleanで表現する。
 */
export type Consent = {
	/** 免責同意 */
	readonly liabilityConsent: boolean;
	/** 情報公開同意 */
	readonly disclosureConsent: boolean;
};
