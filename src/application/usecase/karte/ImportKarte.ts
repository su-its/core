import { IUseCase } from "#application/usecase/base";
import type { Client } from "#domain/aggregates/karte/Client";
import type { Consent } from "#domain/aggregates/karte/Consent";
import type { Consultation } from "#domain/aggregates/karte/Consultation";
import { Karte } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";
import type { Recorded } from "#domain/aggregates/karte/Recorded";
import type { SupportRecord } from "#domain/aggregates/karte/SupportRecord";

export type ImportKarteInput = {
	readonly id: KarteId;
	readonly recordedAt: Date;
	readonly consultedAt: Recorded<Date>;
	readonly lastUpdatedAt: Date;
	readonly client: Recorded<Client>;
	readonly consent: Consent;
	readonly consultation: Consultation;
	readonly supportRecord: SupportRecord;
};

export type ImportKarteOutput = {
	readonly karte: Karte;
};

/**
 * 過去データのインポート用ユースケース
 *
 * Karte.reconstruct()を使い、Recorded型によるnotRecordedを許容する。
 * 新規作成(create)と異なり、recordedAt/lastUpdatedAtを呼び出し側が指定する。
 */
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
