import {
	EventNotFoundException,
	MemberNotFoundException,
} from "../..//exceptions";
import type { EventRepository, MemberRepository } from "../../../domain";
import type { IUseCase } from "../base";

export interface RegisterMemberToExhibitInput {
	memberId: string;
	exhibitId: string;
}

export class RegisterMemberToExhibit
	implements IUseCase<RegisterMemberToExhibitInput, void>
{
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly memberRepository: MemberRepository,
	) {}

	async execute(input: RegisterMemberToExhibitInput): Promise<void> {
		const event = await this.eventRepository.findByExhibitId(input.exhibitId);
		if (!event) {
			throw new EventNotFoundException();
		}
		const member = await this.memberRepository.findById(input.memberId);
		if (!member) {
			throw new MemberNotFoundException();
		}
		event.addExhibitMemberId(input.exhibitId, input.memberId);
		await this.eventRepository.save(event);
	}
}
