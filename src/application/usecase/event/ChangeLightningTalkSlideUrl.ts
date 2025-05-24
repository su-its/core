import type { Event, EventRepository, Url } from "../../../domain";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeLightningTalkSlideUrlInput {
	eventId: string;
	exhibitId: string;
	newSlideUrl: Url;
}

export type ChangeLightningTalkSlideUrlOutput = Event;

/**
 * LTスライドURL変更ユースケース
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
			throw new EventNotFoundException();
		}
		event.changeExhibitLightningTalkSlideUrl(
			input.exhibitId,
			input.newSlideUrl,
		);
		await this.eventRepository.save(event);
		return event;
	}
}
