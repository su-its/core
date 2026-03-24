import { EventNotFoundException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import type { Event, EventId, EventRepository, ExhibitId, Url } from "#domain";

export interface ChangeExhibitUrlInput {
	eventId: EventId;
	exhibitId: ExhibitId;
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
