import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";
import type { Event, EventId, EventRepository, ExhibitId } from "#domain";

export interface ChangeExhibitDescriptionInput {
	eventId: EventId;
	exhibitId: ExhibitId;
	newDescription: string;
}

export interface ChangeExhibitDescriptionOutput {
	event: Event;
}

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
			throw new EventNotFoundException(input.eventId);
		}
		event.changeExhibitDescription(input.exhibitId, input.newDescription);
		await this.eventRepository.save(event);
		return { event };
	}
}
