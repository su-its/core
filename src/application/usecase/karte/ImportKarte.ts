import { IUseCase } from "#application/usecase/base";
import type { ConsultedAt } from "#domain/aggregates/karte/ConsultedAt";
import { Karte } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";
import type { Client } from "#domain/aggregates/karte/Client";
import type { Consent } from "#domain/aggregates/karte/Consent";
import type { Consultation } from "#domain/aggregates/karte/Consultation";
import type { Recorded } from "#domain/aggregates/karte/Recorded";
import type { SupportRecord } from "#domain/aggregates/karte/SupportRecord";

type Input = {
	id: KarteId;
	recordedAt: Date;
	consultedAt: Recorded<ConsultedAt>;
	lastUpdatedAt: Date;
	client: Recorded<Client>;
	consent: Consent;
	consultation: Consultation;
	supportRecord: SupportRecord;
};

export class ImportKarte extends IUseCase<Input, void> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(input: Input): Promise<void> {
		const karte = Karte.reconstruct(input);
		await this.karteRepository.save(karte);
	}
}
