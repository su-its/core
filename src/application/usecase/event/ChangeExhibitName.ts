import type { Event, EventRepository } from "#domain/index.js";
import { EventNotFoundException } from "#application/exceptions/index.js";
import { IUseCase } from "#application/usecase/base.js";

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
