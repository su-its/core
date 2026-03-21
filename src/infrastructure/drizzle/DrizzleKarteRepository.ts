import { eq } from "drizzle-orm";
import type { Client } from "#domain/aggregates/karte/Client";
import type { Consultation } from "#domain/aggregates/karte/Consultation";
import type { ConsultationCategory } from "#domain/aggregates/karte/ConsultationCategory";
import { Karte } from "#domain/aggregates/karte/Karte";
import { type KarteId, karteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";
import type { Recorded } from "#domain/aggregates/karte/Recorded";
import { notRecorded, recorded } from "#domain/aggregates/karte/Recorded";
import type { Resolution } from "#domain/aggregates/karte/Resolution";
import type { SupportRecord } from "#domain/aggregates/karte/SupportRecord";
import { workDuration } from "#domain/aggregates/karte/WorkDuration";
import { type MemberId, memberId } from "#domain/aggregates/member/MemberId";
import type { NonEmptyArray } from "#domain/base/NonEmptyArray";
import {
	type Affiliation,
	DoctoralAffiliation,
	MasterAffiliation,
	ProfessionalAffiliation,
	StudentId,
	UndergraduateAffiliation,
} from "#domain/shared";
import { getDb } from "./client";
import type { SerializedAffiliation } from "./schema";
import {
	consultationCategories,
	karteAssignedMembers,
	karteConsultationCategories,
	kartes,
} from "./schema";

// ============================================================================
// Type Definitions
// ============================================================================

type KarteRow = typeof kartes.$inferSelect;

type KarteWithRelations = KarteRow & {
	karteConsultationCategories: (typeof karteConsultationCategories.$inferSelect & {
		category: typeof consultationCategories.$inferSelect;
	})[];
	karteAssignedMembers: (typeof karteAssignedMembers.$inferSelect)[];
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
			});
		}
		case "teacher":
			return recorded({ type: "teacher", name });
		case "staff":
			return recorded({ type: "staff", name });
		case "other":
			return recorded({ type: "other", name });
	}
}

function deserializeAffiliation(json: SerializedAffiliation): Affiliation {
	switch (json.type) {
		case "undergraduate":
			return new UndergraduateAffiliation(json.value);
		case "master":
			return new MasterAffiliation(json.value);
		case "doctoral":
			return new DoctoralAffiliation(json.value);
		case "professional":
			return new ProfessionalAffiliation(json.value);
	}
}

function serializeAffiliation(affiliation: Affiliation): SerializedAffiliation {
	if (affiliation instanceof UndergraduateAffiliation) {
		return { type: "undergraduate", value: affiliation.getValue() };
	}
	if (affiliation instanceof MasterAffiliation) {
		return { type: "master", value: affiliation.getValue() };
	}
	if (affiliation instanceof DoctoralAffiliation) {
		return { type: "doctoral", value: affiliation.getValue() };
	}
	if (affiliation instanceof ProfessionalAffiliation) {
		return { type: "professional", value: affiliation.getValue() };
	}
	const _: never = affiliation;
	throw new Error(`Unknown affiliation type: ${_}`);
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

function toConsultation(row: KarteWithRelations): Consultation {
	return {
		categories:
			row.karteConsultationCategories.length > 0
				? recorded(
						toNonEmptyArray(
							row.karteConsultationCategories.map((kcc) => ({
								id: kcc.category.id as ConsultationCategory["id"],
								displayName: kcc.category.displayName,
							})),
						),
					)
				: notRecorded(),
		targetDevice:
			row.targetDevice !== null ? recorded(row.targetDevice) : notRecorded(),
		troubleDetails: row.troubleDetails,
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

function toSupportRecord(row: KarteWithRelations): SupportRecord {
	return {
		assignedMemberIds:
			row.karteAssignedMembers.length > 0
				? recorded(
						toNonEmptyArray(
							row.karteAssignedMembers.map((kam) => memberId(kam.memberId)),
						),
					)
				: notRecorded(),
		content: row.supportContent,
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
			row.consultedAt !== null ? recorded(row.consultedAt) : notRecorded(),
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

// ============================================================================
// Repository Implementation
// ============================================================================

export class DrizzleKarteRepository implements KarteRepository {
	async findById(id: KarteId): Promise<Karte | null> {
		const db = getDb();
		const row = await db.query.kartes.findFirst({
			where: eq(kartes.id, id as string),
			with: {
				karteConsultationCategories: {
					with: { category: true },
				},
				karteAssignedMembers: true,
			},
		});

		if (!row) return null;
		return toDomain(row);
	}

	async save(karte: Karte): Promise<void> {
		const db = getDb();
		const now = new Date();

		const clientCols = clientToColumns(karte.client);
		const resCols = resolutionToColumns(karte.supportRecord.resolution);

		const values = {
			id: karte.id as string,
			recordedAt: karte.recordedAt,
			consultedAt: recordedToNullable(karte.consultedAt),
			lastUpdatedAt: karte.lastUpdatedAt,
			clientType: clientCols.clientType,
			clientName: clientCols.clientName,
			clientStudentId: clientCols.clientStudentId,
			clientAffiliation: clientCols.clientAffiliation,
			liabilityConsent: karte.consent.liabilityConsent,
			disclosureConsent: karte.consent.disclosureConsent,
			troubleDetails: karte.consultation.troubleDetails,
			targetDevice: recordedToNullable(karte.consultation.targetDevice),
			supportContent: karte.supportRecord.content,
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

		// Sync consultation categories (delete-all-then-insert)
		await db
			.delete(karteConsultationCategories)
			.where(eq(karteConsultationCategories.karteId, karte.id as string));

		if (karte.consultation.categories.type === "recorded") {
			for (const cat of karte.consultation.categories.value) {
				// Ensure category master exists
				await db
					.insert(consultationCategories)
					.values({
						id: cat.id,
						displayName: cat.displayName,
						updatedAt: now,
					})
					.onConflictDoUpdate({
						target: consultationCategories.id,
						set: { displayName: cat.displayName, updatedAt: now },
					});

				await db.insert(karteConsultationCategories).values({
					karteId: karte.id as string,
					categoryId: cat.id,
				});
			}
		}

		// Sync assigned members (delete-all-then-insert)
		await db
			.delete(karteAssignedMembers)
			.where(eq(karteAssignedMembers.karteId, karte.id as string));

		if (karte.supportRecord.assignedMemberIds.type === "recorded") {
			for (const mid of karte.supportRecord.assignedMemberIds.value) {
				await db.insert(karteAssignedMembers).values({
					karteId: karte.id as string,
					memberId: mid as string,
				});
			}
		}
	}
}
