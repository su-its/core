import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface UpdateEventInput {
	eventId: string;
	name?: string;
	date?: Date;
}

import type { Event } from "../../../domain/aggregates/event/Event";
export type UpdateEventOutput = Event;

/**
 * イベント名・日付の変更ユースケース
 */
export class UpdateEvent extends IUseCase<UpdateEventInput, UpdateEventOutput> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(input: UpdateEventInput): Promise<UpdateEventOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException();
		}
		if (input.name !== undefined) {
			event.changeName(input.name);
		}
		if (input.date !== undefined) {
			event.changeDate(input.date);
		}
		await this.eventRepository.save(event);
		return event;
	}
}
