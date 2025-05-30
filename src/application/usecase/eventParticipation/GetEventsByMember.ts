import type { Event, EventRepository } from "../../../domain";
import { IUseCase } from "../base";

export interface GetEventsByMemberInput {
	memberId: string;
}

export interface GetEventsByMemberOutput {
	events: Event[];
}

export class GetEventsByMember extends IUseCase<
	GetEventsByMemberInput,
	GetEventsByMemberOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(
		input: GetEventsByMemberInput,
	): Promise<GetEventsByMemberOutput> {
		const events = await this.eventRepository.findByParticipantMemberId(
			input.memberId,
		);
		return { events };
	}
}
