import { IUseCase } from "../base";
import type { Karte, KarteRepository } from "#domain";

export type ListKartesInput = Record<string, never>;

export type ListKartesOutput = {
	readonly kartes: readonly Karte[];
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
