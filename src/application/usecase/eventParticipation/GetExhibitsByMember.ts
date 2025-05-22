import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import type { Exhibit } from "../../../domain/aggregates/event/Exhibit";
import type { IUseCase } from "../base";

export interface GetExhibitsByMemberInput {
	memberId: string;
}

export class GetExhibitsByMember
	implements IUseCase<GetExhibitsByMemberInput, Exhibit[]>
{
	constructor(private readonly eventRepository: EventRepository) {}

	async execute(input: GetExhibitsByMemberInput): Promise<Exhibit[]> {
		const events = await this.eventRepository.findByParticipantMemberId(
			input.memberId,
		);
		const exhibits: Exhibit[] = [];
		for (const event of events) {
			for (const exhibit of event.getExhibits()) {
				if (exhibit.getMemberIds().includes(input.memberId)) {
					exhibits.push(exhibit);
				}
			}
		}
		return exhibits;
	}
}
