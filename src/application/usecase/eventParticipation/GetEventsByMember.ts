import type { Event, EventRepository } from "#domain/index.js";
import { IUseCase } from "#application/usecase/base.js";

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
