import type { Event } from "../../../domain/aggregates/event";
import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import { IUseCase } from "../base";

export interface GetEventInput {
	eventId: string;
}

export interface GetEventOutput {
	event: Event | null;
}

/**
 * 指定したEvent IDに該当するEventを取得
 */
export class GetEvent extends IUseCase<GetEventInput, GetEventOutput> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(input: GetEventInput): Promise<GetEventOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		return { event };
	}
}
