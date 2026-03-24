import type { MemberId } from "#domain/aggregates/member/MemberId";
import type { NonEmptyArray } from "#domain/base/NonEmptyArray";
import type { Affiliation } from "#domain/shared";
import type { StudentId } from "#domain/shared";
import type { Assignee } from "./Assignee";
import type { Client } from "./Client";
import type { Consent } from "./Consent";
import type { ConsultedAt } from "./ConsultedAt";
import type { Consultation } from "./Consultation";
import type { ConsultationCategory } from "./ConsultationCategory";
import type { FollowUp } from "./FollowUp";
import type { KarteId } from "./KarteId";
import { type Recorded, recorded } from "./Recorded";
import type { Resolution } from "./Resolution";
import type { SupportRecord } from "./SupportRecord";
import type { WorkDuration } from "./WorkDuration";

/** 新規作成時の解決ステータス — 後処理は必須 */
type CompleteResolution =
  | { readonly type: "resolved" }
  | {
      readonly type: "unresolved";
      readonly followUp: FollowUp;
    };

/**
 * 新規作成・訂正時の相談者
 *
 * 完全なAffiliationのみ受け付ける。PartialAffiliationは不可。
 */
export type CompleteClient =
  | {
      readonly type: "student";
      readonly studentId: StudentId;
      readonly name: string;
      readonly affiliation: Affiliation;
    }
  | { readonly type: "teacher"; readonly name: string }
  | { readonly type: "staff"; readonly name: string }
  | { readonly type: "other"; readonly name: string };

/**
 * カルテの内容を表す入力型
 *
 * create/correctの共通部分。全フィールドが完全に揃った状態を要求する。
 * Recorded型は使わず、生の値を受け取る。
 */
type KarteContentProps = {
  readonly consultedAt: ConsultedAt;
  readonly client: CompleteClient;
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

/** 新規カルテ作成時の入力型 */
type KarteCreationProps = KarteContentProps & { readonly id: KarteId };

/** 永続化データからの復元時の入力型 */
type KarteReconstructProps = {
  readonly id: KarteId;
  readonly recordedAt: Date;
  readonly consultedAt: Recorded<ConsultedAt>;
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
  /**
   * Dateはミュータブルなため、privateで保持しgetterで防御的コピーを返す。
   * readonlyは再代入を防ぐが、Date.setTime()等の破壊的メソッドは防げない。
   */
  private readonly _recordedAt: Date;
  private readonly _lastUpdatedAt: Date;

  private constructor(
    public readonly id: KarteId,
    recordedAt: Date,
    /** 相談日時 */
    public readonly consultedAt: Recorded<ConsultedAt>,
    lastUpdatedAt: Date,
    /** 相談者 */
    public readonly client: Recorded<Client>,
    /** 同意事項 */
    public readonly consent: Consent,
    /** 相談事 */
    public readonly consultation: Consultation,
    /** 対応記録 */
    public readonly supportRecord: SupportRecord,
  ) {
    this._recordedAt = recordedAt;
    this._lastUpdatedAt = lastUpdatedAt;
  }

  /** 記録日時 */
  get recordedAt(): Date {
    return new Date(this._recordedAt);
  }

  /** 最終更新日時 */
  get lastUpdatedAt(): Date {
    return new Date(this._lastUpdatedAt);
  }

  /** 新規カルテの作成 — 全フィールド完全であることを型で保証する */
  static create(props: KarteCreationProps): Karte {
    const now = Date.now();
    return new Karte(
      props.id,
      new Date(now),
      recorded(props.consultedAt),
      new Date(now),
      recorded(props.client),
      props.consent,
      toConsultation(props),
      toSupportRecord(props),
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
  correct(props: KarteContentProps): Karte {
    return new Karte(
      this.id,
      this.recordedAt,
      recorded(props.consultedAt),
      new Date(),
      recorded(props.client),
      props.consent,
      toConsultation(props),
      toSupportRecord(props),
    );
  }
}

/** 生の入力から Consultation（Recorded付き）を構築する */
function toConsultation(props: KarteContentProps): Consultation {
  return {
    categories: recorded(props.consultation.categories),
    targetDevice: recorded(props.consultation.targetDevice),
    troubleDetails: recorded(props.consultation.troubleDetails),
  };
}

/** 生の入力から SupportRecord（Recorded付き）を構築する */
function toSupportRecord(props: KarteContentProps): SupportRecord {
  const [first, ...rest] = props.supportRecord.assignedMemberIds;
  const assignees: NonEmptyArray<Assignee> = [
    { type: "resolved", memberId: first },
    ...rest.map((memberId): Assignee => ({ type: "resolved", memberId })),
  ];

  return {
    assignees: recorded(assignees),
    content: recorded(props.supportRecord.content),
    resolution: recorded(toRecordedResolution(props.supportRecord.resolution)),
    workDuration: recorded(props.supportRecord.workDuration),
  };
}

function toRecordedResolution(complete: CompleteResolution): Resolution {
  if (complete.type === "resolved") {
    return { type: "resolved" };
  }
  return {
    type: "unresolved",
    followUp: recorded(complete.followUp),
  };
}
