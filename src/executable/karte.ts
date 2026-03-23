import {
	CorrectKarte,
	CreateKarte,
	GetKarte,
	ImportKarte,
	ListKartes,
} from "#application";
import { DrizzleKarteRepository } from "#infrastructure";

export type KarteUseCases = {
	createKarte: CreateKarte;
	correctKarte: CorrectKarte;
	getKarte: GetKarte;
	importKarte: ImportKarte;
	listKartes: ListKartes;
};

export function createKarteUseCases(): KarteUseCases {
	const karteRepo = new DrizzleKarteRepository();
	return {
		createKarte: new CreateKarte(karteRepo),
		correctKarte: new CorrectKarte(karteRepo),
		getKarte: new GetKarte(karteRepo),
		importKarte: new ImportKarte(karteRepo),
		listKartes: new ListKartes(karteRepo),
	};
}
