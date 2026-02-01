import type { Event, EventRepository } from "#domain/index.js";
import { EventNotFoundException } from "#application/exceptions/index.js";
import { IUseCase } from "#application/usecase/base.js";

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
			throw new EventNotFoundException(input.eventId);
		}
		event.changeExhibitLightningTalkStartTime(
			input.exhibitId,
			input.newStartTime,
		);
		await this.eventRepository.save(event);
		return { event };
	}
}
