import type { Event, EventRepository, MemberRepository } from "../../../domain";
import {
	EventNotFoundException,
	MemberNotFoundException,
} from "../../exceptions";
import { IUseCase } from "../base";

export interface RegisterMemberToEventInput {
	memberId: string;
	eventId: string;
}

export interface RegisterMemberToEventOutput {
	event: Event;
}

export class RegisterMemberToEvent extends IUseCase<
	RegisterMemberToEventInput,
	RegisterMemberToEventOutput
> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly memberRepository: MemberRepository,
	) {
		super();
	}

	async execute(
		input: RegisterMemberToEventInput,
	): Promise<RegisterMemberToEventOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException();
		}
		const member = await this.memberRepository.findById(input.memberId);
		if (!member) {
			throw new MemberNotFoundException();
		}
		event.addMemberId(input.memberId);
		await this.eventRepository.save(event);
		return { event };
	}
}
