import { IUseCase } from "#application/usecase/base";
import type { Karte } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";

export type GetKarteInput = {
	readonly id: KarteId;
};

export type GetKarteOutput = {
	readonly karte: Karte | null;
};

export class GetKarteUseCase extends IUseCase<GetKarteInput, GetKarteOutput> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(input: GetKarteInput): Promise<GetKarteOutput> {
		const karte = await this.karteRepository.findById(input.id);
		return { karte };
	}
}
