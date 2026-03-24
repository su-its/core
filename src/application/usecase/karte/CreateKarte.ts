import { IUseCase } from "../base";
import {
	Karte,
	type KarteContentProps,
	type KarteId,
	type KarteRepository,
} from "#domain";

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
