import {
	EventNotFoundException,
	MemberNotFoundException,
} from "../../exceptions";
import { IUseCase } from "../base";
import type {
	Event,
	EventRepository,
	ExhibitId,
	MemberId,
	MemberRepository,
} from "#domain";

export interface RegisterMemberToExhibitInput {
	memberId: MemberId;
	exhibitId: ExhibitId;
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
			throw new EventNotFoundException(input.exhibitId);
		}
		const member = await this.memberRepository.findById(input.memberId);
		if (!member) {
			throw new MemberNotFoundException(input.memberId);
		}
		event.addExhibitMemberId(input.exhibitId, input.memberId);
		await this.eventRepository.save(event);
		return { event };
	}
}
