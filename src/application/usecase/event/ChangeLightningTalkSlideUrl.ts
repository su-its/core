import { EventNotFoundException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import type { Event, EventRepository, Url } from "#domain";

export interface ChangeLightningTalkSlideUrlInput {
	eventId: string;
	exhibitId: string;
	newSlideUrl: Url;
}

export interface ChangeLightningTalkSlideUrlOutput {
	event: Event;
}

/**
 * ライトニングトークスライドURL変更ユースケース
 */
export class ChangeLightningTalkSlideUrl extends IUseCase<
	ChangeLightningTalkSlideUrlInput,
	ChangeLightningTalkSlideUrlOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(
		input: ChangeLightningTalkSlideUrlInput,
	): Promise<ChangeLightningTalkSlideUrlOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException(input.eventId);
		}
		event.changeExhibitLightningTalkSlideUrl(
			input.exhibitId,
			input.newSlideUrl,
		);
		await this.eventRepository.save(event);
		return { event };
	}
}
