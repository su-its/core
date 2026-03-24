import type { Karte, KarteId, KarteRepository } from "#domain";
import { KarteNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export type GetKarteInput = {
	readonly karteId: KarteId;
};

export type GetKarteOutput = {
	readonly karte: Karte;
};

export class GetKarteUseCase extends IUseCase<GetKarteInput, GetKarteOutput> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(input: GetKarteInput): Promise<GetKarteOutput> {
		const karte = await this.karteRepository.findById(input.karteId);
		if (!karte) {
			throw new KarteNotFoundException(input.karteId);
		}
		return { karte };
	}
}
