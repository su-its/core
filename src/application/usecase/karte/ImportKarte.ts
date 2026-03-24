import { IUseCase } from "#application/usecase/base";
import type { Client } from "#domain/aggregates/karte/Client";
import type { Consent } from "#domain/aggregates/karte/Consent";
import type { Consultation } from "#domain/aggregates/karte/Consultation";
import type { ConsultedAt } from "#domain/aggregates/karte/ConsultedAt";
import { Karte } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";
import type { Recorded } from "#domain/aggregates/karte/Recorded";
import type { SupportRecord } from "#domain/aggregates/karte/SupportRecord";

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

export class ImportKarteUseCase extends IUseCase<ImportKarteInput, ImportKarteOutput> {
	constructor(private readonly karteRepository: KarteRepository) {
		super();
	}

	async execute(input: ImportKarteInput): Promise<ImportKarteOutput> {
		const karte = Karte.reconstruct(input);
		await this.karteRepository.save(karte);
		return { karte };
	}
}
