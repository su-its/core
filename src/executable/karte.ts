import {
	CorrectKarteUseCase,
	CreateKarteUseCase,
	GetKarteUseCase,
	ImportKarteUseCase,
	ListKartesUseCase,
} from "#application";
import { DrizzleKarteRepository } from "#infrastructure";

export type KarteUseCases = {
	createKarte: CreateKarteUseCase;
	correctKarte: CorrectKarteUseCase;
	getKarte: GetKarteUseCase;
	importKarte: ImportKarteUseCase;
	listKartes: ListKartesUseCase;
};

export function createKarteUseCases(): KarteUseCases {
	const karteRepo = new DrizzleKarteRepository();

	return {
		createKarte: new CreateKarteUseCase(karteRepo),
		correctKarte: new CorrectKarteUseCase(karteRepo),
		getKarte: new GetKarteUseCase(karteRepo),
		importKarte: new ImportKarteUseCase(karteRepo),
		listKartes: new ListKartesUseCase(karteRepo),
	};
}
