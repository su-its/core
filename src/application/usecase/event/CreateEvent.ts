import { Event, type EventRepository } from "../../../domain";
import { IUseCase } from "../base";

export interface CreateEventInput {
	id: string;
	name: string;
	date: Date;
}

export interface CreateEventOutput {
	event: Event;
}

/**
 * 新しいEventを作成し、DBに保存するユースケース。
 */
export class CreateEvent extends IUseCase<CreateEventInput, CreateEventOutput> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(input: CreateEventInput): Promise<CreateEventOutput> {
		const { id, name, date } = input;

		// event生成
		const event = new Event(id, name, date);

		// save
		await this.eventRepository.save(event);

		return { event };
	}
}
