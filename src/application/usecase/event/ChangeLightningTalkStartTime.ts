import type { Event, EventRepository } from "../../../domain";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeLightningTalkStartTimeInput {
	eventId: string;
	exhibitId: string;
	newStartTime: Date;
}

export interface ChangeLightningTalkStartTimeOutput {
	event: Event;
}

/**
 * ライトニングトーク開始時間変更ユースケース
 */
export class ChangeLightningTalkStartTime extends IUseCase<
	ChangeLightningTalkStartTimeInput,
	ChangeLightningTalkStartTimeOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(
		input: ChangeLightningTalkStartTimeInput,
	): Promise<ChangeLightningTalkStartTimeOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException();
		}
		event.changeExhibitLightningTalkStartTime(
			input.exhibitId,
			input.newStartTime,
		);
		await this.eventRepository.save(event);
		return { event };
	}
}
