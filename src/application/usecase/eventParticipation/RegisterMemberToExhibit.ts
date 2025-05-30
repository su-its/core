import type { Event, EventRepository, MemberRepository } from "../../../domain";
import {
	EventNotFoundException,
	MemberNotFoundException,
} from "../../exceptions";
import { IUseCase } from "../base";

export interface RegisterMemberToExhibitInput {
	memberId: string;
	exhibitId: string;
}

export interface RegisterMemberToExhibitOutput {
	event: Event;
}

export class RegisterMemberToExhibit extends IUseCase<
	RegisterMemberToExhibitInput,
	RegisterMemberToExhibitOutput
> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly memberRepository: MemberRepository,
	) {
		super();
	}

	async execute(
		input: RegisterMemberToExhibitInput,
	): Promise<RegisterMemberToExhibitOutput> {
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
		return { event };
	}
}
