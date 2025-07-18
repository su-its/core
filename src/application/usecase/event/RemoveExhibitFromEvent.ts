import type { Event, EventRepository } from "../../../domain";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface RemoveExhibitFromEventInput {
	eventId: string;
	exhibitId: string;
}

export interface RemoveExhibitFromEventOutput {
	event: Event;
}

/**
 * イベントから展示を削除するユースケース
 */
export class RemoveExhibitFromEvent extends IUseCase<
	RemoveExhibitFromEventInput,
	RemoveExhibitFromEventOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(
		input: RemoveExhibitFromEventInput,
	): Promise<RemoveExhibitFromEventOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException(input.eventId);
		}
		event.removeExhibit(input.exhibitId);
		await this.eventRepository.save(event);
		return { event };
	}
}
