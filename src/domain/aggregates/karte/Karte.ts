import { type NonEmptyArray, type Recorded, recorded } from "#domain/base";
import type { Client } from "./Client";
import type { Consent } from "./Consent";
import type { Consultation } from "./Consultation";
import type { ConsultationCategory } from "./ConsultationCategory";
import type { FollowUpDestination } from "./FollowUpDestination";
import type { KarteId } from "./KarteId";
import type { MemberId } from "./MemberId";
import type { Resolution } from "./Resolution";
import type { SupportRecord } from "./SupportRecord";
import type { WorkDuration } from "./WorkDuration";

/**
 * 新規カルテ作成時の入力型
 *
 * 全フィールドが完全に揃った状態を要求する。
 * Recorded型は使わず、生の値を受け取る。
 */
type KarteCreationProps = {
	readonly id: KarteId;
	readonly consultedAt: Date;
	readonly client: Client;
	readonly consent: Consent;
	readonly consultation: {
		readonly categories: NonEmptyArray<ConsultationCategory>;
		readonly targetDevice: string;
		readonly troubleDetails: string;
	};
	readonly supportRecord: {
		readonly assignedMemberIds: NonEmptyArray<MemberId>;
		readonly content: string;
		readonly resolution: CompleteResolution;
		readonly workDuration: WorkDuration;
	};
};

/** 新規作成時の解決ステータス — 後処理先は必須 */
type CompleteResolution =
	| { readonly type: "resolved" }
	| {
			readonly type: "unresolved";
			readonly followUpDestination: FollowUpDestination;
	  };

/** 訂正時の入力型 — 作成時と同じく完全な生の値を要求する */
type KarteCorrectionProps = {
	readonly consultedAt: Date;
	readonly client: Client;
	readonly consent: Consent;
	readonly consultation: {
		readonly categories: NonEmptyArray<ConsultationCategory>;
		readonly targetDevice: string;
		readonly troubleDetails: string;
	};
	readonly supportRecord: {
		readonly assignedMemberIds: NonEmptyArray<MemberId>;
		readonly content: string;
		readonly resolution: CompleteResolution;
		readonly workDuration: WorkDuration;
	};
};

/** 永続化データからの復元時の入力型 */
type KarteReconstructProps = {
	readonly id: KarteId;
	readonly recordedAt: Date;
	readonly consultedAt: Recorded<Date>;
	readonly lastUpdatedAt: Date;
	readonly client: Recorded<Client>;
	readonly consent: Consent;
	readonly consultation: Consultation;
	readonly supportRecord: SupportRecord;
};

/**
 * カルテ集約ルート
 *
 * PC相談室での相談記録を表す。
 * 同意事項・相談事・対応記録という3つのドメイン概念で構成される。
 * 作成時に全データが揃うイミュータブルな記録であり、
 * 修正は correct() による明示的な訂正操作のみ許可する。
 *
 * 過去データでは一部フィールドが未記録（Recorded型のnotRecorded）の場合がある。
 * 新規作成時は create() により全フィールドの完全性を保証する。
 */
export class Karte {
	private constructor(
		public readonly id: KarteId,
		/** 記録日時 */
		public readonly recordedAt: Date,
		/** 相談日時 */
		public readonly consultedAt: Recorded<Date>,
		/** 最終更新日時 */
		public readonly lastUpdatedAt: Date,
		/** 相談者 */
		public readonly client: Recorded<Client>,
		/** 同意事項 */
		public readonly consent: Consent,
		/** 相談事 */
		public readonly consultation: Consultation,
		/** 対応記録 */
		public readonly supportRecord: SupportRecord,
	) {}

	/** 新規カルテの作成 — 全フィールド完全であることを型で保証する */
	static create(props: KarteCreationProps): Karte {
		const now = new Date();
		return new Karte(
			props.id,
			now,
			recorded(props.consultedAt),
			now,
			recorded(props.client),
			props.consent,
			{
				categories: recorded(props.consultation.categories),
				targetDevice: recorded(props.consultation.targetDevice),
				troubleDetails: props.consultation.troubleDetails,
			},
			{
				assignedMemberIds: recorded(props.supportRecord.assignedMemberIds),
				content: props.supportRecord.content,
				resolution: recorded(
					toRecordedResolution(props.supportRecord.resolution),
				),
				workDuration: props.supportRecord.workDuration,
			},
		);
	}

	/** 永続化データからの復元 — バリデーションなし */
	static reconstruct(props: KarteReconstructProps): Karte {
		return new Karte(
			props.id,
			props.recordedAt,
			props.consultedAt,
			props.lastUpdatedAt,
			props.client,
			props.consent,
			props.consultation,
			props.supportRecord,
		);
	}

	/**
	 * カルテの訂正
	 *
	 * 記録ミスの修正など、既存カルテの内容を訂正した新しいインスタンスを返す。
	 * recordedAt（元の記録日時）は保持し、lastUpdatedAt を現在時刻に更新する。
	 * 完全な生の値を受け取り、不変条件は型で保証する。
	 */
	correct(props: KarteCorrectionProps): Karte {
		return new Karte(
			this.id,
			this.recordedAt,
			recorded(props.consultedAt),
			new Date(),
			recorded(props.client),
			props.consent,
			{
				categories: recorded(props.consultation.categories),
				targetDevice: recorded(props.consultation.targetDevice),
				troubleDetails: props.consultation.troubleDetails,
			},
			{
				assignedMemberIds: recorded(props.supportRecord.assignedMemberIds),
				content: props.supportRecord.content,
				resolution: recorded(
					toRecordedResolution(props.supportRecord.resolution),
				),
				workDuration: props.supportRecord.workDuration,
			},
		);
	}
}

function toRecordedResolution(complete: CompleteResolution): Resolution {
	if (complete.type === "resolved") {
		return { type: "resolved" };
	}
	return {
		type: "unresolved",
		followUpDestination: recorded(complete.followUpDestination),
	};
}
