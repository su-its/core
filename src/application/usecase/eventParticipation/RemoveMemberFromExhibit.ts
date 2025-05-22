import type { EventRepository, MemberRepository } from "../../../domain";
import { EventNotFoundException } from "../../exceptions";
import type { IUseCase } from "../base";

export interface RemoveMemberFromExhibitInput {
	memberId: string;
	exhibitId: string;
}

export class RemoveMemberFromExhibit
	implements IUseCase<RemoveMemberFromExhibitInput, void>
{
	constructor(
		private readonly memberRepository: MemberRepository,
		private readonly eventRepository: EventRepository,
	) {}

	async execute(input: RemoveMemberFromExhibitInput): Promise<void> {
		const event = await this.eventRepository.findByExhibitId(input.exhibitId);
		if (!event) {
			throw new EventNotFoundException();
		}
		event.removeExhibitMemberId(input.exhibitId, input.memberId);
		await this.eventRepository.save(event);
	}
}
