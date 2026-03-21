import { IUseCase } from "#application/usecase/base";
import type { Karte } from "#domain/aggregates/karte/Karte";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";

export type ListKartesInput = Record<string, never>;

export type ListKartesOutput = {
	readonly kartes: Karte[];
};

export class ListKartesUseCase extends IUseCase<
	ListKartesInput,
	ListKartesOutput
> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(_input: ListKartesInput): Promise<ListKartesOutput> {
		const kartes = await this.karteRepository.findAll();
		return { kartes };
	}
}
