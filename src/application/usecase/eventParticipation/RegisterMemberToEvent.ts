import {
	EventNotFoundException,
	MemberNotFoundException,
} from "../../exceptions";
import { IUseCase } from "../base";
import type {
	Event,
	EventId,
	EventRepository,
	MemberId,
	MemberRepository,
} from "#domain";

export interface RegisterMemberToEventInput {
	memberId: MemberId;
	eventId: EventId;
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
			throw new EventNotFoundException(input.eventId);
		}
		const member = await this.memberRepository.findById(input.memberId);
		if (!member) {
			throw new MemberNotFoundException(input.memberId);
		}
		event.addMemberId(input.memberId);
		await this.eventRepository.save(event);
		return { event };
	}
}
