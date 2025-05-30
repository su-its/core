import type { EventRepository, Exhibit } from "../../../domain";
import { IUseCase } from "../base";

export interface GetExhibitsByMemberInput {
	memberId: string;
}

export interface GetExhibitsByMemberOutput {
	exhibits: Exhibit[];
}

export class GetExhibitsByMember extends IUseCase<
	GetExhibitsByMemberInput,
	GetExhibitsByMemberOutput
> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(
		input: GetExhibitsByMemberInput,
	): Promise<GetExhibitsByMemberOutput> {
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
		return { exhibits };
	}
}
