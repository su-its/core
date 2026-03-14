import type { Recorded } from "#domain/base";
import type { Affiliation } from "#domain/shared";
import type { Consent } from "./Consent";
import type { ConsultationCategory } from "./ConsultationCategory";
import type { FollowUpDestination } from "./FollowUpDestination";
import type { Karte } from "./Karte";
import type { WorkDuration } from "./WorkDuration";

/** 相談者のスナップショット */
type ClientSnapshot =
	| {
			readonly type: "student";
			readonly studentId: string;
			readonly name: string;
			readonly affiliation: ReturnType<Affiliation["getValue"]>;
	  }
	| { readonly type: "faculty"; readonly name: string }
	| { readonly type: "staff"; readonly name: string }
	| { readonly type: "other"; readonly name: string };

/** 解決ステータスのスナップショット */
type ResolutionSnapshot =
	| { readonly type: "resolved" }
	| {
			readonly type: "unresolved";
			readonly followUpDestination: Recorded<FollowUpDestination>;
	  };

/** 相談事のスナップショット */
type ConsultationSnapshot = {
	readonly categories: Recorded<readonly ConsultationCategory[]>;
	readonly targetDevice: Recorded<string>;
	readonly troubleDetails: string;
};

/** 対応記録のスナップショット */
type SupportRecordSnapshot = {
	readonly assignedMemberIds: Recorded<readonly string[]>;
	readonly content: string;
	readonly resolution: Recorded<ResolutionSnapshot>;
	readonly workDuration: WorkDuration;
};

/** カルテの永続化用スナップショット */
export type KarteSnapshot = {
	readonly id: string;
	readonly recordedAt: Date;
	readonly consultedAt: Recorded<Date>;
	readonly lastUpdatedAt: Date;
	readonly client: Recorded<ClientSnapshot>;
	readonly consent: Consent;
	readonly consultation: ConsultationSnapshot;
	readonly supportRecord: SupportRecordSnapshot;
};

/** Karteドメインオブジェクトからスナップショットを生成する */
export function toKarteSnapshot(karte: Karte): KarteSnapshot {
	return {
		id: karte.id,
		recordedAt: karte.recordedAt,
		consultedAt: karte.consultedAt,
		lastUpdatedAt: karte.lastUpdatedAt,
		client: snapshotClient(karte.client),
		consent: karte.consent,
		consultation: {
			categories: karte.consultation.categories,
			targetDevice: karte.consultation.targetDevice,
			troubleDetails: karte.consultation.troubleDetails,
		},
		supportRecord: snapshotSupportRecord(karte.supportRecord),
	};
}

function snapshotClient(client: Karte["client"]): Recorded<ClientSnapshot> {
	if (client.type === "notRecorded") {
		return { type: "notRecorded" };
	}
	const c = client.value;
	switch (c.type) {
		case "student":
			return {
				type: "recorded",
				value: {
					type: c.type,
					name: c.name,
					studentId: c.studentId.getValue(),
					affiliation: c.affiliation.getValue(),
				},
			};
		case "faculty":
			return {
				type: "recorded",
				value: { type: c.type, name: c.name },
			};
		case "staff":
			return {
				type: "recorded",
				value: { type: c.type, name: c.name },
			};
		case "other":
			return {
				type: "recorded",
				value: { type: c.type, name: c.name },
			};
	}
}

function snapshotSupportRecord(
	sr: Karte["supportRecord"],
): SupportRecordSnapshot {
	return {
		assignedMemberIds: sr.assignedMemberIds,
		content: sr.content,
		resolution: sr.resolution,
		workDuration: sr.workDuration,
	};
}
