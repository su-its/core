import type { Event } from "../../../domain/aggregates/event/Event";
import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeLightningTalkStartTimeInput {
	eventId: string;
	exhibitId: string;
	newStartTime: Date;
}

export type ChangeLightningTalkStartTimeOutput = Event;

/**
 * LT開始時刻変更ユースケース
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
		return event;
	}
}
