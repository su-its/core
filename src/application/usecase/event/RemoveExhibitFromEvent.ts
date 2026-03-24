import { EventNotFoundException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import type { Event, EventId, EventRepository, ExhibitId } from "#domain";

export interface RemoveExhibitFromEventInput {
	eventId: EventId;
	exhibitId: ExhibitId;
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
