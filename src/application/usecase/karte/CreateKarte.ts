import { IUseCase } from "#application/usecase/base";
import { Karte, type KarteContentProps } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";

export type CreateKarteInput = KarteContentProps & { readonly id: KarteId };

export type CreateKarteOutput = {
	readonly karte: Karte;
};

export class CreateKarteUseCase extends IUseCase<
	CreateKarteInput,
	CreateKarteOutput
> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(input: CreateKarteInput): Promise<CreateKarteOutput> {
		const karte = Karte.create(input);
		await this.karteRepository.save(karte);
		return { karte };
	}
}
