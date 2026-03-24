import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";
import type { Event, EventId, EventRepository } from "#domain";

export interface DeleteEventInput {
	eventId: EventId;
}

export interface DeleteEventOutput {
	event: Event;
}

/**
 * イベント削除ユースケース
 */
export class DeleteEvent extends IUseCase<DeleteEventInput, DeleteEventOutput> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(input: DeleteEventInput): Promise<DeleteEventOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException(input.eventId);
		}
		await this.eventRepository.delete(input.eventId);
		return { event };
	}
}
