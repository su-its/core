import { IUseCase } from "#application/usecase/base";
import type { ConsultedAt } from "#domain/aggregates/karte/ConsultedAt";
import { Karte } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";
import type { Client } from "#domain/aggregates/karte/Client";
import type { Consent } from "#domain/aggregates/karte/Consent";
import type { ConsultationCategory } from "#domain/aggregates/karte/ConsultationCategory";
import type { FollowUp } from "#domain/aggregates/karte/FollowUp";
import type { WorkDuration } from "#domain/aggregates/karte/WorkDuration";
import type { MemberId } from "#domain/aggregates/member/MemberId";
import type { NonEmptyArray } from "#domain/base/NonEmptyArray";

type Input = {
	id: KarteId;
	consultedAt: ConsultedAt;
	client: Client;
	consent: Consent;
	consultation: {
		categories: NonEmptyArray<ConsultationCategory>;
		targetDevice: string;
		troubleDetails: string;
	};
	supportRecord: {
		assignedMemberIds: NonEmptyArray<MemberId>;
		content: string;
		resolution:
			| { type: "resolved" }
			| { type: "unresolved"; followUp: FollowUp };
		workDuration: WorkDuration;
	};
};

export class CreateKarte extends IUseCase<Input, void> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(input: Input): Promise<void> {
		const karte = Karte.create(input);
		await this.karteRepository.save(karte);
	}
}
