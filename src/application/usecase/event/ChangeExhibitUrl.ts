import type { Event, EventRepository, Url } from "#domain/index.js";
import { EventNotFoundException } from "#application/exceptions/index.js";
import { IUseCase } from "#application/usecase/base.js";

export interface ChangeExhibitUrlInput {
	eventId: string;
	exhibitId: string;
	newUrl: Url;
}

export interface ChangeExhibitUrlOutput {
	event: Event;
}

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
			throw new EventNotFoundException(input.eventId);
		}
		event.changeExhibitUrl(input.exhibitId, input.newUrl);
		await this.eventRepository.save(event);
		return { event };
	}
}
