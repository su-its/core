import { IUseCase } from "#application/usecase/base";
import type { Karte } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";

type Input = { id: KarteId };
type Output = { karte: Karte | null };

export class GetKarte extends IUseCase<Input, Output> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(input: Input): Promise<Output> {
		const karte = await this.karteRepository.findById(input.id);
		return { karte };
	}
}
