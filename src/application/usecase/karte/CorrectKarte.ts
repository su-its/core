import type { Karte, KarteContentProps, KarteId, KarteRepository } from "#domain";
import { KarteNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export type CorrectKarteInput = KarteContentProps & {
	readonly karteId: KarteId;
};

export type CorrectKarteOutput = {
	readonly karte: Karte;
};

export class CorrectKarteUseCase extends IUseCase<CorrectKarteInput, CorrectKarteOutput> {
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
