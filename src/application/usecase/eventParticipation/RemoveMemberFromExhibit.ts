import { EventNotFoundException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import type {
	Event,
	EventRepository,
	ExhibitId,
	MemberId,
	MemberRepository,
} from "#domain";

export interface RemoveMemberFromExhibitInput {
	memberId: MemberId;
	exhibitId: ExhibitId;
}

export interface RemoveMemberFromExhibitOutput {
	event: Event;
}

export class RemoveMemberFromExhibit extends IUseCase<
	RemoveMemberFromExhibitInput,
	RemoveMemberFromExhibitOutput
> {
	constructor(
		private readonly memberRepository: MemberRepository,
		private readonly eventRepository: EventRepository,
	) {
		super();
	}

	async execute(
		input: RemoveMemberFromExhibitInput,
	): Promise<RemoveMemberFromExhibitOutput> {
		const event = await this.eventRepository.findByExhibitId(input.exhibitId);
		if (!event) {
			throw new EventNotFoundException(input.exhibitId);
		}
		event.removeExhibitMemberId(input.exhibitId, input.memberId);
		await this.eventRepository.save(event);
		return { event };
	}
}
