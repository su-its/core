import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import type { Member } from "../../../domain/aggregates/member/Member";
import type { MemberRepository } from "../../../domain/aggregates/member/MemberRepository";
import { EventNotFoundException } from "../../exceptions/ApplicationExceptions";
import type { IUseCase } from "../base";

export interface GetMembersByEventInput {
	eventId: string;
}

export class GetMembersByEvent
	implements IUseCase<GetMembersByEventInput, Member[]>
{
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly memberRepository: MemberRepository,
	) {}

	async execute(input: GetMembersByEventInput): Promise<Member[]> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException();
		}
		return (
			await Promise.all(
				event
					.getMemberIds()
					.map((memberId) => this.memberRepository.findById(memberId)),
			)
		).filter((member) => member !== null);
	}
}
