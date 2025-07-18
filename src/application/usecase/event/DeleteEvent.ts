import type { Event, EventRepository } from "../../../domain";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface DeleteEventInput {
	eventId: string;
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
