import type { Event } from "../../../domain/aggregates/event/Event";
import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import type { Url } from "../../../domain/value-objects/Url";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeExhibitUrlInput {
	eventId: string;
	exhibitId: string;
	newUrl: Url;
}

export type ChangeExhibitUrlOutput = Event;

/**
 * 展示URL変更ユースケース
 */
export class ChangeExhibitUrl extends IUseCase<
	ChangeExhibitUrlInput,
	ChangeExhibitUrlOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(input: ChangeExhibitUrlInput): Promise<ChangeExhibitUrlOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException();
		}
		event.changeExhibitUrl(input.exhibitId, input.newUrl);
		await this.eventRepository.save(event);
		return event;
	}
}
