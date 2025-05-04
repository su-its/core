import type { Event } from "../../../domain/aggregates/event/Event";
import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeExhibitMarkdownContentInput {
	eventId: string;
	exhibitId: string;
	newMarkdownContent: string;
}

export type ChangeExhibitMarkdownContentOutput = Event;

/**
 * 展示Markdownコンテンツ変更ユースケース
 */
export class ChangeExhibitMarkdownContent extends IUseCase<
	ChangeExhibitMarkdownContentInput,
	ChangeExhibitMarkdownContentOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(
		input: ChangeExhibitMarkdownContentInput,
	): Promise<ChangeExhibitMarkdownContentOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException();
		}
		event.changeExhibitMarkdownContent(
			input.exhibitId,
			input.newMarkdownContent,
		);
		await this.eventRepository.save(event);
		return event;
	}
}
