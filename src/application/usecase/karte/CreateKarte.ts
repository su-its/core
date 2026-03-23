import { IUseCase } from "#application/usecase/base";
import type { Consent } from "#domain/aggregates/karte/Consent";
import type { ConsultationCategory } from "#domain/aggregates/karte/ConsultationCategory";
import type { FollowUp } from "#domain/aggregates/karte/FollowUp";
import { type CompleteClient, Karte } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";
import type { WorkDuration } from "#domain/aggregates/karte/WorkDuration";
import type { MemberId } from "#domain/aggregates/member/MemberId";
import type { NonEmptyArray } from "#domain/base/NonEmptyArray";

/** 新規カルテ作成時の解決ステータス */
type CreateResolution =
	| { readonly type: "resolved" }
	| { readonly type: "unresolved"; readonly followUp: FollowUp };

export type CreateKarteInput = {
	readonly id: KarteId;
	readonly consultedAt: Date;
	readonly client: CompleteClient;
	readonly consent: Consent;
	readonly consultation: {
		readonly categories: NonEmptyArray<ConsultationCategory>;
		readonly targetDevice: string;
		readonly troubleDetails: string;
	};
	readonly supportRecord: {
		readonly assignedMemberIds: NonEmptyArray<MemberId>;
		readonly content: string;
		readonly resolution: CreateResolution;
		readonly workDuration: WorkDuration;
	};
};

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
