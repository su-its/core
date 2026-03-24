import type { Event, EventId, EventRepository, ExhibitId, LightningTalkDuration } from "#domain";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeLightningTalkDurationInput {
	eventId: EventId;
	exhibitId: ExhibitId;
	newDuration: LightningTalkDuration;
}

export interface ChangeLightningTalkDurationOutput {
	event: Event;
}

/**
 * ライトニングトーク時間変更ユースケース
 */
export class ChangeLightningTalkDuration extends IUseCase<
	ChangeLightningTalkDurationInput,
	ChangeLightningTalkDurationOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(
		input: ChangeLightningTalkDurationInput,
	): Promise<ChangeLightningTalkDurationOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException(input.eventId);
		}
		event.changeExhibitLightningTalkDuration(input.exhibitId, input.newDuration);
		await this.eventRepository.save(event);
		return { event };
	}
}
