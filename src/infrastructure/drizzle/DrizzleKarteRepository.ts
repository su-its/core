import { eq } from "drizzle-orm";
import type { Assignee } from "#domain/aggregates/karte/Assignee";
import type { Client } from "#domain/aggregates/karte/Client";
import type { Consultation } from "#domain/aggregates/karte/Consultation";
import { CONSULTATION_CATEGORIES, type ConsultationCategory } from "#domain/aggregates/karte/ConsultationCategory";
import { Karte } from "#domain/aggregates/karte/Karte";
import { type KarteId, karteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";
import type { Recorded } from "#domain/aggregates/karte/Recorded";
import { notRecorded, recorded } from "#domain/aggregates/karte/Recorded";
import type { Resolution } from "#domain/aggregates/karte/Resolution";
import type { SupportRecord } from "#domain/aggregates/karte/SupportRecord";
import { workDuration } from "#domain/aggregates/karte/WorkDuration";
import { memberId } from "#domain/aggregates/member/MemberId";
import type { NonEmptyArray } from "#domain/base/NonEmptyArray";
import {
	type Affiliation,
	type PartialAffiliation,
	StudentId,
} from "#domain/shared";
import { getDb } from "./client";
import type { SerializedAffiliation } from "./schema";
import { karteAssignees, kartes } from "./schema";

// ============================================================================
// Type Definitions
// ============================================================================

type KarteRow = typeof kartes.$inferSelect;

type KarteWithRelations = KarteRow & {
	karteAssignees: (typeof karteAssignees.$inferSelect)[];
};

// ============================================================================
// Domain ↔ DB Mapping
// ============================================================================

function toRecordedClient(row: KarteRow): Recorded<Client> {
	if (row.clientType === null) return notRecorded();

	if (row.clientName === null) {
		throw new Error(
			`データ不整合: clientType=${row.clientType} だが clientName が null`,
		);
	}
	const name = row.clientName;

	switch (row.clientType) {
		case "student": {
			if (row.clientStudentId === null || row.clientAffiliation === null) {
				throw new Error(
					"データ不整合: student だが studentId または affiliation が null",
				);
			}
			return recorded({
				type: "student",
				name,
				studentId: StudentId.fromString(row.clientStudentId),
				affiliation: deserializeAffiliation(row.clientAffiliation),
			} as Client);
		}
		case "teacher":
			return recorded({ type: "teacher", name });
		case "staff":
			return recorded({ type: "staff", name });
		case "other":
			return recorded({ type: "other", name });
	}
}

/**
 * JSONBからAffiliationを復元する。
 *
 * DB由来のJSONBデータのため、キャストで型を絞り込む。
 */
function deserializeAffiliation(
	json: SerializedAffiliation,
): Affiliation | PartialAffiliation {
	return { type: json.type, value: json.value } as Affiliation | PartialAffiliation;
}

function serializeAffiliation(
	affiliation: Affiliation | PartialAffiliation,
): SerializedAffiliation {
	return { type: affiliation.type, value: affiliation.value } as SerializedAffiliation;
}

/**
 * 配列をNonEmptyArrayに変換する。
 * 要素が1つ以上あることを実行時に検証し、型を正しく導出する。
 */
function toNonEmptyArray<T>(arr: T[]): NonEmptyArray<T> {
	const [first, ...rest] = arr;
	if (first === undefined) {
		throw new Error("Expected non-empty array");
	}
	return [first, ...rest];
}

function toConsultation(row: KarteRow): Consultation {
	return {
		categories:
			row.categoryIds.length > 0
				? recorded(
						toNonEmptyArray(
							row.categoryIds.map((id) => {
								const master = CONSULTATION_CATEGORIES.find((c) => c.id === id);
								return { id, displayName: master?.displayName ?? id };
							}),
						),
					)
				: notRecorded(),
		targetDevice:
			row.targetDevice !== null ? recorded(row.targetDevice) : notRecorded(),
		troubleDetails:
			row.troubleDetails !== null ? recorded(row.troubleDetails) : notRecorded(),
	};
}

function toResolution(row: KarteRow): Recorded<Resolution> {
	if (row.resolutionType === null) return notRecorded();

	switch (row.resolutionType) {
		case "resolved":
			return recorded({ type: "resolved" });
		case "unresolved":
			return recorded({
				type: "unresolved",
				followUp:
					row.followUp !== null ? recorded(row.followUp) : notRecorded(),
			});
	}
}

function toAssignee(
	row: typeof karteAssignees.$inferSelect,
): Assignee {
	if (row.assigneeType === "resolved") {
		if (row.memberId === null) {
			throw new Error("データ不整合: assigneeType=resolved だが memberId が null");
		}
		return { type: "resolved", memberId: memberId(row.memberId) };
	}
	if (row.assigneeName === null) {
		throw new Error("データ不整合: assigneeType=unresolved だが assigneeName が null");
	}
	return { type: "unresolved", name: row.assigneeName };
}

function toSupportRecord(row: KarteWithRelations): SupportRecord {
	return {
		assignees:
			row.karteAssignees.length > 0
				? recorded(toNonEmptyArray(row.karteAssignees.map(toAssignee)))
				: notRecorded(),
		content:
			row.supportContent !== null ? recorded(row.supportContent) : notRecorded(),
		resolution: toResolution(row),
		workDuration:
			row.workDurationMinutes !== null
				? recorded(workDuration(row.workDurationMinutes))
				: notRecorded(),
	};
}

function toDomain(row: KarteWithRelations): Karte {
	return Karte.reconstruct({
		id: karteId(row.id),
		recordedAt: row.recordedAt,
		consultedAt:
			row.consultedAt !== null
				? recorded({ precision: "date" as const, value: row.consultedAt })
				: notRecorded(),
		lastUpdatedAt: row.lastUpdatedAt,
		client: toRecordedClient(row),
		consent: {
			liabilityConsent: row.liabilityConsent,
			disclosureConsent: row.disclosureConsent,
		},
		consultation: toConsultation(row),
		supportRecord: toSupportRecord(row),
	});
}

// ============================================================================
// Persistence Helpers
// ============================================================================

type KarteInsert = typeof kartes.$inferInsert;

function clientToColumns(
	client: Recorded<Client>,
): Pick<
	KarteInsert,
	"clientType" | "clientName" | "clientStudentId" | "clientAffiliation"
> {
	if (client.type === "notRecorded") {
		return {
			clientType: null,
			clientName: null,
			clientStudentId: null,
			clientAffiliation: null,
		};
	}
	const c = client.value;
	return {
		clientType: c.type,
		clientName: c.name,
		clientStudentId: c.type === "student" ? c.studentId.getValue() : null,
		clientAffiliation:
			c.type === "student"
				? (serializeAffiliation(c.affiliation) as SerializedAffiliation)
				: null,
	};
}

function resolutionToColumns(
	resolution: Recorded<Resolution>,
): Pick<KarteInsert, "resolutionType" | "followUp"> {
	if (resolution.type === "notRecorded") {
		return { resolutionType: null, followUp: null };
	}
	const r = resolution.value;
	if (r.type === "resolved") {
		return { resolutionType: "resolved", followUp: null };
	}
	return {
		resolutionType: "unresolved",
		followUp: r.followUp.type === "recorded" ? r.followUp.value : null,
	};
}

function recordedToNullable<T>(r: Recorded<T>): T | null {
	return r.type === "recorded" ? r.value : null;
}

/** ConsultedAt → DBのtimestampカラム用Date | null */
function consultedAtToDate(
	r: Recorded<import("#domain/aggregates/karte/ConsultedAt").ConsultedAt>,
): Date | null {
	if (r.type === "notRecorded") return null;
	const ca = r.value;
	switch (ca.precision) {
		case "datetime":
		case "date":
			return ca.value instanceof Date ? ca.value : new Date(ca.value);
		case "yearMonth":
			return new Date(ca.year, ca.month - 1, 1);
		case "year":
			return new Date(ca.year, 0, 1);
	}
}

// ============================================================================
// Repository Implementation
// ============================================================================

export class DrizzleKarteRepository implements KarteRepository {
	async findById(id: KarteId): Promise<Karte | null> {
		const db = getDb();
		const row = await db.query.kartes.findFirst({
			where: eq(kartes.id, id as string),
			with: {
				karteAssignees: true,
			},
		});

		if (!row) return null;
		return toDomain(row);
	}

	async findAll(): Promise<Karte[]> {
		const db = getDb();
		const rows = await db.query.kartes.findMany({
			with: {
				karteAssignees: true,
			},
			orderBy: (kartes, { desc }) => [desc(kartes.recordedAt)],
		});
		return rows.map(toDomain);
	}

	async save(karte: Karte): Promise<void> {
		const db = getDb();
		const now = new Date();

		const clientCols = clientToColumns(karte.client);
		const resCols = resolutionToColumns(karte.supportRecord.resolution);

		const values = {
			id: karte.id as string,
			recordedAt: karte.recordedAt,
			consultedAt: consultedAtToDate(karte.consultedAt),
			lastUpdatedAt: karte.lastUpdatedAt,
			clientType: clientCols.clientType,
			clientName: clientCols.clientName,
			clientStudentId: clientCols.clientStudentId,
			clientAffiliation: clientCols.clientAffiliation,
			liabilityConsent: karte.consent.liabilityConsent,
			disclosureConsent: karte.consent.disclosureConsent,
			categoryIds:
				karte.consultation.categories.type === "recorded"
					? karte.consultation.categories.value.map((c) => c.id)
					: [],
			troubleDetails: recordedToNullable(karte.consultation.troubleDetails),
			targetDevice: recordedToNullable(karte.consultation.targetDevice),
			supportContent: recordedToNullable(karte.supportRecord.content),
			resolutionType: resCols.resolutionType,
			followUp: resCols.followUp,
			workDurationMinutes: recordedToNullable(karte.supportRecord.workDuration),
		};

		// Upsert karte
		await db
			.insert(kartes)
			.values(values)
			.onConflictDoUpdate({
				target: kartes.id,
				set: { ...values, id: undefined },
			});

		// Sync assignees (delete-all-then-insert)
		await db
			.delete(karteAssignees)
			.where(eq(karteAssignees.karteId, karte.id as string));

		if (karte.supportRecord.assignees.type === "recorded") {
			for (const assignee of karte.supportRecord.assignees.value) {
				await db.insert(karteAssignees).values({
					karteId: karte.id as string,
					assigneeType: assignee.type,
					memberId:
						assignee.type === "resolved"
							? (assignee.memberId as string)
							: null,
					assigneeName:
						assignee.type === "unresolved" ? assignee.name : null,
				});
			}
		}
	}
}
