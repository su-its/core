import type { Event, EventRepository } from "#domain/index.js";
import { IUseCase } from "#application/usecase/base.js";

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
