import { describe, expect, it } from "vitest";
import { Karte } from "#domain/aggregates/karte/Karte";
import { karteId } from "#domain/aggregates/karte/KarteId";
import { workDuration } from "#domain/aggregates/karte/WorkDuration";
import { StudentId } from "#domain/shared/StudentId";
import { UndergraduateAffiliation } from "#domain/shared/affiliation/Affiliation";

/** テスト用のKarteCreationPropsを生成する */
function createProps() {
	return {
		id: karteId("test-karte-id"),
		consultedAt: new Date("2025-01-15T10:00:00Z"),
		client: {
			type: "student" as const,
			studentId: StudentId.fromString("70312031"),
			name: "テスト太郎",
			affiliation: new UndergraduateAffiliation({
				faculty: "情報学部",
				department: "情報科学科",
				year: 3,
			}),
		},
		consent: {
			liabilityConsent: true,
			disclosureConsent: false,
		},
		consultation: {
			categories: [
				{ id: "wifi_eduroam" as const, displayName: "eduroamに対する接続方法の相談" },
			] as [{ id: "wifi_eduroam"; displayName: string }],
			targetDevice: "ノートPC",
			troubleDetails: "eduroamに接続できない",
		},
		supportRecord: {
			assignedMemberIds: ["member-1"] as [string],
			content: "プロファイルを再設定して解決",
			resolution: { type: "resolved" as const },
			workDuration: workDuration(30),
		},
	};
}

describe("Karte", () => {
	describe("create", () => {
		it("recordedAtとlastUpdatedAtが現在時刻で設定される", () => {
			const before = Date.now();
			const karte = Karte.create(createProps());
			const after = Date.now();

			expect(karte.recordedAt.getTime()).toBeGreaterThanOrEqual(before);
			expect(karte.recordedAt.getTime()).toBeLessThanOrEqual(after);
			expect(karte.lastUpdatedAt.getTime()).toBeGreaterThanOrEqual(before);
			expect(karte.lastUpdatedAt.getTime()).toBeLessThanOrEqual(after);
		});

		it("recordedAtとlastUpdatedAtが同一時刻になる", () => {
			const karte = Karte.create(createProps());

			expect(karte.recordedAt.getTime()).toBe(karte.lastUpdatedAt.getTime());
		});

		it("consultedAtがRecordedでラップされる", () => {
			const karte = Karte.create(createProps());

			expect(karte.consultedAt).toEqual({
				type: "recorded",
				value: new Date("2025-01-15T10:00:00Z"),
			});
		});

		it("clientがRecordedでラップされる", () => {
			const karte = Karte.create(createProps());

			expect(karte.client.type).toBe("recorded");
		});

		it("consultation内のフィールドがRecordedでラップされる", () => {
			const karte = Karte.create(createProps());

			expect(karte.consultation.categories.type).toBe("recorded");
			expect(karte.consultation.targetDevice.type).toBe("recorded");
			expect(karte.consultation.troubleDetails).toBe("eduroamに接続できない");
		});

		it("supportRecord内のフィールドがRecordedでラップされる", () => {
			const karte = Karte.create(createProps());

			expect(karte.supportRecord.assignedMemberIds.type).toBe("recorded");
			expect(karte.supportRecord.resolution.type).toBe("recorded");
			expect(karte.supportRecord.workDuration.type).toBe("recorded");
			expect(karte.supportRecord.content).toBe("プロファイルを再設定して解決");
		});
	});

	describe("correct", () => {
		it("idとrecordedAtが元のカルテから保持される", () => {
			const original = Karte.create(createProps());
			const corrected = original.correct({
				...createProps(),
				consultation: {
					...createProps().consultation,
					troubleDetails: "訂正後の内容",
				},
			});

			expect(corrected.id).toBe(original.id);
			expect(corrected.recordedAt).toBe(original.recordedAt);
		});

		it("lastUpdatedAtが新しい時刻に更新される", () => {
			const original = Karte.create(createProps());
			const beforeCorrect = Date.now();
			const corrected = original.correct(createProps());

			expect(corrected.lastUpdatedAt.getTime()).toBeGreaterThanOrEqual(
				beforeCorrect,
			);
		});

		it("内容が新しい値で置き換わる", () => {
			const original = Karte.create(createProps());
			const corrected = original.correct({
				...createProps(),
				consultation: {
					...createProps().consultation,
					troubleDetails: "訂正: 実はVPN接続の問題だった",
				},
			});

			expect(corrected.consultation.troubleDetails).toBe(
				"訂正: 実はVPN接続の問題だった",
			);
		});

		it("未解決の場合にfollowUpがRecordedでラップされる", () => {
			const original = Karte.create(createProps());
			const corrected = original.correct({
				...createProps(),
				supportRecord: {
					...createProps().supportRecord,
					resolution: {
						type: "unresolved" as const,
						followUp: "技術部" as const,
					},
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
});
