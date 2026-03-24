import type { Event, EventId, EventRepository, ExhibitId, Url } from "#domain";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeLightningTalkSlideUrlInput {
	eventId: EventId;
	exhibitId: ExhibitId;
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
