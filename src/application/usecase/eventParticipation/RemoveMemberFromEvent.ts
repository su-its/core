import type { Event, EventRepository, MemberRepository } from "../../../domain";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface RemoveMemberFromEventInput {
	memberId: string;
	eventId: string;
}

export interface RemoveMemberFromEventOutput {
	event: Event;
}

export class RemoveMemberFromEvent extends IUseCase<
	RemoveMemberFromEventInput,
	RemoveMemberFromEventOutput
> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly memberRepository: MemberRepository,
	) {
		super();
	}

	async execute(
		input: RemoveMemberFromEventInput,
	): Promise<RemoveMemberFromEventOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException();
		}
		event.removeMemberId(input.memberId);
		await this.eventRepository.save(event);
		return { event };
	}
}
