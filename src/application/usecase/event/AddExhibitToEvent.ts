import {
	type Event,
	type EventRepository,
	Exhibit,
	type Url,
} from "../../../domain";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface AddExhibitToEventInput {
	eventId: string;
	exhibit: {
		id: string;
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
			throw new EventNotFoundException();
		}
		const { id, name, description, markdownContent, url } = input.exhibit;
		const exhibit = new Exhibit(id, name, description, markdownContent, url);
		event.addExhibit(exhibit);
		await this.eventRepository.save(event);

		return { event };
	}
}
