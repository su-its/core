import type { Event } from "../../../domain/aggregates/event/Event";
import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeExhibitDescriptionInput {
	eventId: string;
	exhibitId: string;
	newDescription: string;
}

export type ChangeExhibitDescriptionOutput = Event;

/**
 * 展示説明変更ユースケース
 */
export class ChangeExhibitDescription extends IUseCase<
	ChangeExhibitDescriptionInput,
	ChangeExhibitDescriptionOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(
		input: ChangeExhibitDescriptionInput,
	): Promise<ChangeExhibitDescriptionOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException();
		}
		event.changeExhibitDescription(input.exhibitId, input.newDescription);
		await this.eventRepository.save(event);
		return event;
	}
}
