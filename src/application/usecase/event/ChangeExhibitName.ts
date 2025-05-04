import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeExhibitNameInput {
	eventId: string;
	exhibitId: string;
	newName: string;
}

import type { Event } from "../../../domain/aggregates/event/Event";
export type ChangeExhibitNameOutput = Event;

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
			throw new EventNotFoundException();
		}
		event.changeExhibitName(input.exhibitId, input.newName);
		await this.eventRepository.save(event);
		return event;
	}
}
