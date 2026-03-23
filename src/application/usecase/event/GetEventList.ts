import { IUseCase } from "#application/usecase/base";
import type { Event, EventRepository } from "#domain";

export type GetEventListInput = Record<string, never>;

export interface GetEventListOutput {
	events: Event[];
}

export class GetEventList extends IUseCase<GetEventListInput, GetEventListOutput> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(_input: GetEventListInput): Promise<GetEventListOutput> {
		const events = await this.eventRepository.findAll();
		return { events };
	}
}
