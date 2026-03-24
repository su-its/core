import { IUseCase } from "../base";
import {
	Karte,
	type Client,
	type Consent,
	type Consultation,
	type ConsultedAt,
	type KarteId,
	type KarteRepository,
	type Recorded,
	type SupportRecord,
} from "#domain";

/**
 * 過去データのインポート用入力
 *
 * 新規作成と異なり、一部フィールドが未記録（notRecorded）である可能性がある。
 * Karte.reconstruct() を使用して不変条件をバイパスする。
 */
export type ImportKarteInput = {
	readonly id: KarteId;
	readonly recordedAt: Date;
	readonly consultedAt: Recorded<ConsultedAt>;
	readonly lastUpdatedAt: Date;
	readonly client: Recorded<Client>;
	readonly consent: Consent;
	readonly consultation: Consultation;
	readonly supportRecord: SupportRecord;
};

export type ImportKarteOutput = {
	readonly karte: Karte;
};

export class ImportKarteUseCase extends IUseCase<
	ImportKarteInput,
	ImportKarteOutput
> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(input: ImportKarteInput): Promise<ImportKarteOutput> {
		const karte = Karte.reconstruct(input);
		await this.karteRepository.save(karte);
		return { karte };
	}
}
