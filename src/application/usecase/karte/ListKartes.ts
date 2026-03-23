import { IUseCase } from "#application/usecase/base";
import type { Karte } from "#domain/aggregates/karte/Karte";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";

type Input = Record<string, never>;
type Output = { kartes: Karte[] };

export class ListKartes extends IUseCase<Input, Output> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(_input: Input): Promise<Output> {
		const kartes = await this.karteRepository.findAll();
		return { kartes };
	}
}
