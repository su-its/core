import { EventNotFoundException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import {
	type Event,
	type EventId,
	type EventRepository,
	Exhibit,
	type ExhibitId,
	type Url,
} from "#domain";

export interface AddExhibitToEventInput {
	eventId: EventId;
	exhibit: {
		id: ExhibitId;
		name: string;
		description?: string;
		markdownContent?: string;
		url?: Url;
	};
}

export interface AddExhibitToEventOutput {
	event: Event;
}

/**
 * イベントに展示を追加するユースケース
 */
export class AddExhibitToEvent extends IUseCase<
	AddExhibitToEventInput,
	AddExhibitToEventOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(
		input: AddExhibitToEventInput,
	): Promise<AddExhibitToEventOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException(input.eventId);
		}
		const { id, name, description, markdownContent, url } = input.exhibit;
		const exhibit = new Exhibit(id, name, description, markdownContent, url);
		event.addExhibit(exhibit);
		await this.eventRepository.save(event);

		return { event };
	}
}
