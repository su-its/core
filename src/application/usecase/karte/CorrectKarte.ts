import { IUseCase } from "#application/usecase/base";
import type { Client } from "#domain/aggregates/karte/Client";
import type { Consent } from "#domain/aggregates/karte/Consent";
import type { ConsultationCategory } from "#domain/aggregates/karte/ConsultationCategory";
import type { FollowUp } from "#domain/aggregates/karte/FollowUp";
import { Karte } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";
import type { WorkDuration } from "#domain/aggregates/karte/WorkDuration";
import type { MemberId } from "#domain/aggregates/member/MemberId";
import type { NonEmptyArray } from "#domain/base/NonEmptyArray";
import { ApplicationException } from "#application/exceptions";

export type CorrectKarteInput = {
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
		readonly resolution:
			| { readonly type: "resolved" }
			| { readonly type: "unresolved"; readonly followUp: FollowUp };
		readonly workDuration: WorkDuration;
	};
};

export type CorrectKarteOutput = {
	readonly karte: Karte;
};

export class KarteNotFoundException extends ApplicationException {
	constructor(karteId: string) {
		super(`カルテが見つかりません: ${karteId}`);
		this.name = "KarteNotFoundException";
	}
}

export class CorrectKarteUseCase extends IUseCase<
	CorrectKarteInput,
	CorrectKarteOutput
> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(input: CorrectKarteInput): Promise<CorrectKarteOutput> {
		const existing = await this.karteRepository.findById(input.id);
		if (!existing) {
			throw new KarteNotFoundException(input.id as string);
		}

		const corrected = existing.correct(input);
		await this.karteRepository.save(corrected);
		return { karte: corrected };
	}
}
