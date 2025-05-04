import type { Event } from "../../../domain/aggregates/event";
import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import { IUseCase } from "../base";

export type GetEventListInput = Record<string, never>;

export type GetEventListOutput = Event[];

/**
 * 全Eventを一覧取得するユースケース
 */
export class GetEventList extends IUseCase<
	GetEventListInput,
	GetEventListOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(_input: GetEventListInput): Promise<GetEventListOutput> {
		return await this.eventRepository.findAll();
	}
}
