import type { Event, EventRepository } from "../../../domain";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeExhibitMarkdownContentInput {
	eventId: string;
	exhibitId: string;
	newMarkdownContent: string;
}

export interface ChangeExhibitMarkdownContentOutput {
	event: Event;
}

/**
 * 展示マークダウンコンテンツ変更ユースケース
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
			throw new EventNotFoundException(input.eventId);
		}
		event.changeExhibitMarkdownContent(
			input.exhibitId,
			input.newMarkdownContent,
		);
		await this.eventRepository.save(event);
		return { event };
	}
}
