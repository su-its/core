import type { Event } from "../../../domain/aggregates/event/Event";
import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import type { IUseCase } from "../base";

export interface GetEventsByMemberInput {
	memberId: string;
}

export class GetEventsByMember
	implements IUseCase<GetEventsByMemberInput, Event[]>
{
	constructor(private readonly eventRepository: EventRepository) {}

	async execute(input: GetEventsByMemberInput): Promise<Event[]> {
		return await this.eventRepository.findByParticipantMemberId(input.memberId);
	}
}
