import {
	CorrectKarteUseCase,
	CreateKarteUseCase,
	GetKarteUseCase,
	ImportKarteUseCase,
	ListKartesUseCase,
} from "#application";
import type { Karte } from "#domain/aggregates/karte/Karte";
import { karteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";
import { memberId } from "#domain/aggregates/member/MemberId";
import { nonEmptyString } from "#domain/base/NonEmptyString";
import { workDuration } from "#domain/aggregates/karte/WorkDuration";
import { StudentId } from "#domain/shared/StudentId";
import { DrizzleKarteRepository } from "#infrastructure";
import type { CompleteAffiliation } from "#domain/shared/affiliation/Affiliation";
import type { Consent } from "#domain/aggregates/karte/Consent";
import type { ConsultedAt } from "#domain/aggregates/karte/ConsultedAt";
import type { ConsultationCategory } from "#domain/aggregates/karte/ConsultationCategory";
import type { CompleteResolution } from "#domain/aggregates/karte/Karte";
import type { Client } from "#domain/aggregates/karte/Client";
import type { Consultation } from "#domain/aggregates/karte/Consultation";
import type { Recorded } from "#domain/shared/Recorded";
import type { SupportRecord } from "#domain/aggregates/karte/SupportRecord";

// ============================================================================
// Facade Input Types
// ============================================================================

/**
 * ファサード用のクライアント入力型
 *
 * CompleteClientからStudentIdをstring化したもの。
 * CompleteAffiliation等のplain object unionはそのまま保持する。
 */
type ClientInput =
	| {
			type: "student";
			studentId: string;
			name: string;
			affiliation: CompleteAffiliation;
	  }
	| { type: "teacher"; name: string }
	| { type: "staff"; name: string }
	| { type: "other"; name: string };

/** create / correct 共通の入力型 */
type KarteContentInput = {
	consultedAt: ConsultedAt;
	client: ClientInput;
	consent: Consent;
	consultation: {
		categories: ConsultationCategory[];
		targetDevice: string;
		troubleDetails: string;
	};
	supportRecord: {
		assignedMemberIds: string[];
		content: string;
		resolution: CompleteResolution;
		workDuration: number;
	};
};

// ============================================================================
// Service Type
// ============================================================================

export type KarteService = {
	create(input: { id: string } & KarteContentInput): Promise<{ karte: Karte }>;

	correct(input: { karteId: string } & KarteContentInput): Promise<{ karte: Karte }>;

	getById(karteId: string): Promise<{ karte: Karte }>;

	list(): Promise<{ kartes: readonly Karte[] }>;

	import(input: {
		id: string;
		recordedAt: Date;
		consultedAt: Recorded<ConsultedAt>;
		lastUpdatedAt: Date;
		client: Recorded<Client>;
		consent: Consent;
		consultation: Consultation;
		supportRecord: SupportRecord;
	}): Promise<{ karte: Karte }>;
};

export type KarteServiceDeps = {
	karteRepository?: KarteRepository;
};

// ============================================================================
// Input Conversion
// ============================================================================

function toCompleteClient(input: ClientInput) {
	if (input.type === "student") {
		return {
			type: input.type,
			name: input.name,
			studentId: StudentId.fromString(input.studentId),
			affiliation: input.affiliation,
		} as const;
	}
	return input;
}

function toKarteContentProps(input: KarteContentInput) {
	const [firstCategory, ...restCategories] = input.consultation.categories;
	if (firstCategory === undefined) {
		throw new Error("categories must have at least one element");
	}

	const [firstMemberId, ...restMemberIds] = input.supportRecord.assignedMemberIds;
	if (firstMemberId === undefined) {
		throw new Error("assignedMemberIds must have at least one element");
	}

	return {
		consultedAt: input.consultedAt,
		client: toCompleteClient(input.client),
		consent: input.consent,
		consultation: {
			categories: [firstCategory, ...restCategories] as const,
			targetDevice: nonEmptyString(input.consultation.targetDevice),
			troubleDetails: nonEmptyString(input.consultation.troubleDetails),
		},
		supportRecord: {
			assignedMemberIds: [
				memberId(firstMemberId),
				...restMemberIds.map((id) => memberId(id)),
			] as const,
			content: nonEmptyString(input.supportRecord.content),
			resolution: input.supportRecord.resolution,
			workDuration: workDuration(input.supportRecord.workDuration),
		},
	};
}

// ============================================================================
// Factory
// ============================================================================

export function createKarteService(deps?: KarteServiceDeps): KarteService {
	const karteRepo = deps?.karteRepository ?? new DrizzleKarteRepository();

	const createKarte = new CreateKarteUseCase(karteRepo);
	const correctKarte = new CorrectKarteUseCase(karteRepo);
	const getKarte = new GetKarteUseCase(karteRepo);
	const listKartes = new ListKartesUseCase(karteRepo);
	const importKarte = new ImportKarteUseCase(karteRepo);

	return {
		create: (input) =>
			createKarte.execute({
				id: karteId(input.id),
				...toKarteContentProps(input),
			}),

		correct: (input) =>
			correctKarte.execute({
				karteId: karteId(input.karteId),
				...toKarteContentProps(input),
			}),

		getById: (id) => getKarte.execute({ karteId: karteId(id) }),

		list: () => listKartes.execute({} as Record<string, never>),

		import: (input) =>
			importKarte.execute({
				id: karteId(input.id),
				recordedAt: input.recordedAt,
				consultedAt: input.consultedAt,
				lastUpdatedAt: input.lastUpdatedAt,
				client: input.client,
				consent: input.consent,
				consultation: input.consultation,
				supportRecord: input.supportRecord,
			}),
	};
}
