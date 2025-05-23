import type { EventRepository, MemberRepository } from "../../../domain";
import {
	EventNotFoundException,
	MemberNotFoundException,
} from "../../exceptions";
import type { IUseCase } from "../base";

export interface RegisterMemberToEventInput {
	memberId: string;
	eventId: string;
}

export class RegisterMemberToEvent
	implements IUseCase<RegisterMemberToEventInput, void>
{
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly memberRepository: MemberRepository,
	) {}

	async execute(input: RegisterMemberToEventInput): Promise<void> {
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
	}
}
