import { KarteNotFoundException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import type { Consent } from "#domain/aggregates/karte/Consent";
import type { ConsultationCategory } from "#domain/aggregates/karte/ConsultationCategory";
import type { ConsultedAt } from "#domain/aggregates/karte/ConsultedAt";
import type { FollowUp } from "#domain/aggregates/karte/FollowUp";
import type { CompleteClient, Karte } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";
import type { WorkDuration } from "#domain/aggregates/karte/WorkDuration";
import type { MemberId } from "#domain/aggregates/member/MemberId";
import type { NonEmptyArray } from "#domain/base/NonEmptyArray";

/** 訂正時の解決ステータス */
type CorrectResolution =
	| { readonly type: "resolved" }
	| { readonly type: "unresolved"; readonly followUp: FollowUp };

export type CorrectKarteInput = {
	readonly karteId: KarteId;
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
		readonly resolution: CorrectResolution;
		readonly workDuration: WorkDuration;
	};
};

export type CorrectKarteOutput = {
	readonly karte: Karte;
};

export class CorrectKarteUseCase extends IUseCase<
	CorrectKarteInput,
	CorrectKarteOutput
> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(input: CorrectKarteInput): Promise<CorrectKarteOutput> {
		const existing = await this.karteRepository.findById(input.karteId);
		if (!existing) {
			throw new KarteNotFoundException(input.karteId);
		}

		const corrected = existing.correct(input);
		await this.karteRepository.save(corrected);
		return { karte: corrected };
	}
}
