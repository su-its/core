import { KarteNotFoundException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import type { Karte, KarteContentProps } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";

export type CorrectKarteInput = KarteContentProps & {
	readonly karteId: KarteId;
};

export type CorrectKarteOutput = {
	readonly karte: Karte;
};

export class CorrectKarteUseCase extends IUseCase<
	CorrectKarteInput,
	CorrectKarteOutput
> {
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
