import { describe, expect, it } from "vitest";
import { dateTime } from "#domain/aggregates/karte/ConsultedAt";
import type { KarteContentProps } from "#domain/aggregates/karte/Karte";
import { Karte } from "#domain/aggregates/karte/Karte";
import { karteId } from "#domain/aggregates/karte/KarteId";
import { notRecorded, recorded } from "#domain/aggregates/karte/Recorded";
import { workDuration } from "#domain/aggregates/karte/WorkDuration";
import { type MemberId, memberId } from "#domain/aggregates/member/MemberId";
import { nonEmptyString } from "#domain/base/NonEmptyString";
import { StudentId } from "#domain/shared/StudentId";
import type { CompleteAffiliation } from "#domain/shared/affiliation/Affiliation";

const TEST_AFFILIATION: CompleteAffiliation = {
	type: "undergraduate",
	value: { faculty: "情報学部", department: "情報科学科", year: 3 },
} as CompleteAffiliation;

function createContentProps(): KarteContentProps {
	return {
		consultedAt: dateTime(new Date("2025-01-15T10:00:00Z")),
		client: {
			type: "student",
			studentId: StudentId.fromString("70312031"),
			name: "テスト太郎",
			affiliation: TEST_AFFILIATION,
		},
		consent: {
			liabilityConsent: true,
			disclosureConsent: false,
		},
		consultation: {
			categories: [
				{
					id: "wifi_eduroam" as const,
					displayName: "eduroamに対する接続方法の相談",
				},
			] as [{ id: "wifi_eduroam"; displayName: string }],
			targetDevice: nonEmptyString("ノートPC"),
			troubleDetails: nonEmptyString("eduroamに接続できない"),
		},
		supportRecord: {
			assignedMemberIds: [memberId("member-1")] as [MemberId],
			content: nonEmptyString("プロファイルを再設定して解決"),
			resolution: { type: "resolved" },
			workDuration: workDuration(30),
		},
	};
}

function createKarte() {
	return Karte.create({
		id: karteId("test-karte-id"),
		...createContentProps(),
	});
}

describe("Karte", () => {
	// ========================================================================
	// create
	// ========================================================================

	describe("create", () => {
		it("recordedAtとlastUpdatedAtが現在時刻で設定される", () => {
			const before = Date.now();
			const karte = createKarte();
			const after = Date.now();

			expect(karte.recordedAt.getTime()).toBeGreaterThanOrEqual(before);
			expect(karte.recordedAt.getTime()).toBeLessThanOrEqual(after);
			expect(karte.lastUpdatedAt.getTime()).toBeGreaterThanOrEqual(before);
			expect(karte.lastUpdatedAt.getTime()).toBeLessThanOrEqual(after);
		});

		it("recordedAtとlastUpdatedAtが同一時刻になる", () => {
			const karte = createKarte();
			expect(karte.recordedAt.getTime()).toBe(karte.lastUpdatedAt.getTime());
		});

		it("idが保持される", () => {
			const karte = createKarte();
			expect(karte.id).toBe("test-karte-id");
		});

		// -- Recorded ラップ --

		it("consultedAtがRecordedでラップされる", () => {
			const karte = createKarte();
			expect(karte.consultedAt).toEqual({
				type: "recorded",
				value: {
					precision: "datetime",
					value: new Date("2025-01-15T10:00:00Z"),
				},
			});
		});

		it("studentクライアントがRecordedでラップされる", () => {
			const karte = createKarte();
			expect(karte.client.type).toBe("recorded");
			if (karte.client.type === "recorded") {
				expect(karte.client.value.type).toBe("student");
				if (karte.client.value.type === "student") {
					expect(karte.client.value.name).toBe("テスト太郎");
				}
			}
		});

		it("consultation内のフィールドがRecordedでラップされる", () => {
			const karte = createKarte();
			expect(karte.consultation.categories.type).toBe("recorded");
			expect(karte.consultation.targetDevice).toEqual({
				type: "recorded",
				value: "ノートPC",
			});
			expect(karte.consultation.troubleDetails).toEqual({
				type: "recorded",
				value: "eduroamに接続できない",
			});
		});

		it("supportRecord内のフィールドがRecordedでラップされる", () => {
			const karte = createKarte();
			expect(karte.supportRecord.assignees.type).toBe("recorded");
			expect(karte.supportRecord.resolution.type).toBe("recorded");
			expect(karte.supportRecord.workDuration).toEqual({
				type: "recorded",
				value: 30,
			});
			expect(karte.supportRecord.content).toEqual({
				type: "recorded",
				value: "プロファイルを再設定して解決",
			});
		});

		// -- Assignee変換 --

		it("assignedMemberIdsがResolvedAssigneeに変換される", () => {
			const karte = createKarte();
			if (karte.supportRecord.assignees.type === "recorded") {
				expect(karte.supportRecord.assignees.value).toEqual([
					{ type: "resolved", memberId: memberId("member-1") },
				]);
			}
		});

		it("複数のassignedMemberIdsがすべてResolvedAssigneeに変換される", () => {
			const props = createContentProps();
			const karte = Karte.create({
				id: karteId("multi-assignee"),
				...props,
				supportRecord: {
					...props.supportRecord,
					assignedMemberIds: [memberId("member-1"), memberId("member-2"), memberId("member-3")],
				},
			});
			if (karte.supportRecord.assignees.type === "recorded") {
				expect(karte.supportRecord.assignees.value).toHaveLength(3);
				expect(karte.supportRecord.assignees.value[0]).toEqual({
					type: "resolved",
					memberId: memberId("member-1"),
				});
				expect(karte.supportRecord.assignees.value[2]).toEqual({
					type: "resolved",
					memberId: memberId("member-3"),
				});
			}
		});

		// -- クライアント種別 --

		it("teacherクライアントで作成できる", () => {
			const props = createContentProps();
			const karte = Karte.create({
				id: karteId("teacher-karte"),
				...props,
				client: { type: "teacher", name: "教員太郎" },
			});
			if (karte.client.type === "recorded") {
				expect(karte.client.value).toEqual({
					type: "teacher",
					name: "教員太郎",
				});
			}
		});

		it("staffクライアントで作成できる", () => {
			const props = createContentProps();
			const karte = Karte.create({
				id: karteId("staff-karte"),
				...props,
				client: { type: "staff", name: "職員花子" },
			});
			if (karte.client.type === "recorded") {
				expect(karte.client.value).toEqual({ type: "staff", name: "職員花子" });
			}
		});

		it("otherクライアントで作成できる", () => {
			const props = createContentProps();
			const karte = Karte.create({
				id: karteId("other-karte"),
				...props,
				client: { type: "other", name: "学外者一郎" },
			});
			if (karte.client.type === "recorded") {
				expect(karte.client.value).toEqual({
					type: "other",
					name: "学外者一郎",
				});
			}
		});

		// -- Resolution --

		it("resolvedの場合のresolution変換", () => {
			const karte = createKarte();
			expect(karte.supportRecord.resolution).toEqual({
				type: "recorded",
				value: { type: "resolved" },
			});
		});

		it("unresolvedの場合、followUpがRecordedでラップされる", () => {
			const props = createContentProps();
			const karte = Karte.create({
				id: karteId("unresolved-karte"),
				...props,
				supportRecord: {
					...props.supportRecord,
					resolution: { type: "unresolved", followUp: "生協" as const },
				},
			});
			expect(karte.supportRecord.resolution).toEqual({
				type: "recorded",
				value: {
					type: "unresolved",
					followUp: { type: "recorded", value: "生協" },
				},
			});
		});
	});

	// ========================================================================
	// correct
	// ========================================================================

	describe("correct", () => {
		it("idとrecordedAtが元のカルテから保持される", () => {
			const original = createKarte();
			const props = createContentProps();
			const corrected = original.correct({
				...props,
				consultation: {
					...props.consultation,
					troubleDetails: nonEmptyString("訂正後の内容"),
				},
			});

			expect(corrected.id).toBe(original.id);
			expect(corrected.recordedAt).toEqual(original.recordedAt);
		});

		it("lastUpdatedAtが新しい時刻に更新される", () => {
			const original = createKarte();
			const beforeCorrect = Date.now();
			const corrected = original.correct(createContentProps());

			expect(corrected.lastUpdatedAt.getTime()).toBeGreaterThanOrEqual(beforeCorrect);
		});

		it("内容が新しい値で置き換わる", () => {
			const original = createKarte();
			const props = createContentProps();
			const corrected = original.correct({
				...props,
				consultation: {
					...props.consultation,
					troubleDetails: nonEmptyString("訂正: 実はVPN接続の問題だった"),
				},
			});

			expect(corrected.consultation.troubleDetails).toEqual({
				type: "recorded",
				value: "訂正: 実はVPN接続の問題だった",
			});
		});

		it("クライアント種別を変更できる", () => {
			const original = createKarte();
			const props = createContentProps();
			const corrected = original.correct({
				...props,
				client: { type: "teacher", name: "教員太郎" },
			});

			if (corrected.client.type === "recorded") {
				expect(corrected.client.value.type).toBe("teacher");
			}
		});

		it("resolutionをresolvedからunresolvedに変更できる", () => {
			const original = createKarte();
			const props = createContentProps();
			const corrected = original.correct({
				...props,
				supportRecord: {
					...props.supportRecord,
					resolution: { type: "unresolved", followUp: "技術部" as const },
				},
			});

			expect(corrected.supportRecord.resolution).toEqual({
				type: "recorded",
				value: {
					type: "unresolved",
					followUp: { type: "recorded", value: "技術部" },
				},
			});
		});
	});

	// ========================================================================
	// reconstruct
	// ========================================================================

	describe("reconstruct", () => {
		it("全フィールドがそのまま復元される", () => {
			const now = new Date();
			const karte = Karte.reconstruct({
				id: karteId("restored-karte"),
				recordedAt: now,
				consultedAt: recorded(dateTime(new Date("2025-01-15T10:00:00Z"))),
				lastUpdatedAt: now,
				client: recorded({
					type: "student",
					studentId: StudentId.fromString("70312031"),
					name: "復元太郎",
					affiliation: TEST_AFFILIATION,
				}),
				consent: { liabilityConsent: true, disclosureConsent: true },
				consultation: {
					categories: recorded([{ id: "wifi_eduroam" as const, displayName: "eduroam" }] as [
						{ id: "wifi_eduroam"; displayName: string },
					]),
					targetDevice: recorded("ノートPC"),
					troubleDetails: recorded("接続できない"),
				},
				supportRecord: {
					assignees: recorded([{ type: "resolved" as const, memberId: memberId("m-1") }] as [
						{ type: "resolved"; memberId: MemberId },
					]),
					content: recorded("対応した"),
					resolution: recorded({ type: "resolved" as const }),
					workDuration: recorded(workDuration(15)),
				},
			});

			expect(karte.id).toBe("restored-karte");
			expect(karte.consent.disclosureConsent).toBe(true);
			if (karte.client.type === "recorded") {
				expect(karte.client.value.name).toBe("復元太郎");
			}
		});

		it("notRecordedフィールドを含む過去データを復元できる", () => {
			const now = new Date();
			const karte = Karte.reconstruct({
				id: karteId("old-karte"),
				recordedAt: now,
				consultedAt: notRecorded(),
				lastUpdatedAt: now,
				client: notRecorded(),
				consent: { liabilityConsent: false, disclosureConsent: false },
				consultation: {
					categories: notRecorded(),
					targetDevice: notRecorded(),
					troubleDetails: notRecorded(),
				},
				supportRecord: {
					assignees: notRecorded(),
					content: notRecorded(),
					resolution: notRecorded(),
					workDuration: notRecorded(),
				},
			});

			expect(karte.consultedAt.type).toBe("notRecorded");
			expect(karte.client.type).toBe("notRecorded");
			expect(karte.consultation.categories.type).toBe("notRecorded");
			expect(karte.consultation.targetDevice.type).toBe("notRecorded");
			expect(karte.consultation.troubleDetails.type).toBe("notRecorded");
			expect(karte.supportRecord.assignees.type).toBe("notRecorded");
			expect(karte.supportRecord.content.type).toBe("notRecorded");
			expect(karte.supportRecord.resolution.type).toBe("notRecorded");
			expect(karte.supportRecord.workDuration.type).toBe("notRecorded");
		});

		it("recordedAtの防御的コピーが機能する", () => {
			const karte = Karte.reconstruct({
				id: karteId("defensive-copy-test"),
				recordedAt: new Date("2025-01-01T00:00:00Z"),
				consultedAt: notRecorded(),
				lastUpdatedAt: new Date(),
				client: notRecorded(),
				consent: { liabilityConsent: true, disclosureConsent: true },
				consultation: {
					categories: notRecorded(),
					targetDevice: notRecorded(),
					troubleDetails: notRecorded(),
				},
				supportRecord: {
					assignees: notRecorded(),
					content: notRecorded(),
					resolution: notRecorded(),
					workDuration: notRecorded(),
				},
			});

			const retrieved = karte.recordedAt;
			retrieved.setFullYear(2000);
			expect(karte.recordedAt.getFullYear()).toBe(2025);
		});

		it("lastUpdatedAtの防御的コピーが機能する", () => {
			const karte = Karte.reconstruct({
				id: karteId("defensive-copy-test-2"),
				recordedAt: new Date(),
				consultedAt: notRecorded(),
				lastUpdatedAt: new Date("2025-06-01T00:00:00Z"),
				client: notRecorded(),
				consent: { liabilityConsent: true, disclosureConsent: true },
				consultation: {
					categories: notRecorded(),
					targetDevice: notRecorded(),
					troubleDetails: notRecorded(),
				},
				supportRecord: {
					assignees: notRecorded(),
					content: notRecorded(),
					resolution: notRecorded(),
					workDuration: notRecorded(),
				},
			});

			const retrieved = karte.lastUpdatedAt;
			retrieved.setFullYear(2000);
			expect(karte.lastUpdatedAt.getFullYear()).toBe(2025);
		});
	});
});
