import type { EventRepository, MemberRepository } from "../../../domain";
import { EventNotFoundException } from "../../exceptions";
import type { IUseCase } from "../base";

export interface RemoveMemberFromEventInput {
	memberId: string;
	eventId: string;
}

export class RemoveMemberFromEvent
	implements IUseCase<RemoveMemberFromEventInput, void>
{
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly memberRepository: MemberRepository,
	) {}

	async execute(input: RemoveMemberFromEventInput): Promise<void> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException();
		}
		event.removeMemberId(input.memberId);
		await this.eventRepository.save(event);
	}
}
