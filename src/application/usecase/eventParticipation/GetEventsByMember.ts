import { IUseCase } from "#application/usecase/base";
import type { Event, EventRepository, MemberId } from "#domain";

export interface GetEventsByMemberInput {
	memberId: MemberId;
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
