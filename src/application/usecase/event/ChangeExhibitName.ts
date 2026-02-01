import { EventNotFoundException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import type { Event, EventRepository } from "#domain";

export interface ChangeExhibitNameInput {
	eventId: string;
	exhibitId: string;
	newName: string;
}

export interface ChangeExhibitNameOutput {
	event: Event;
}

/**
 * 展示名変更ユースケース
 */
export class ChangeExhibitName extends IUseCase<
	ChangeExhibitNameInput,
	ChangeExhibitNameOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(
		input: ChangeExhibitNameInput,
	): Promise<ChangeExhibitNameOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException(input.eventId);
		}
		event.changeExhibitName(input.exhibitId, input.newName);
		await this.eventRepository.save(event);
		return { event };
	}
}
