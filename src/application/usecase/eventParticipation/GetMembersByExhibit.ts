import { EventNotFoundException } from "../../exceptions";
import type { EventRepository } from "../../../domain/aggregates/event/EventRepository";
import type { Member } from "../../../domain/aggregates/member/Member";
import type { MemberRepository } from "../../../domain/aggregates/member/MemberRepository";
import type { IUseCase } from "../base";

export interface GetMembersByExhibitInput {
	exhibitId: string;
}

export class GetMembersByExhibit
	implements IUseCase<GetMembersByExhibitInput, Member[]>
{
	constructor(
		private readonly memberRepository: MemberRepository,
		private readonly eventRepository: EventRepository,
	) {}

	async execute(input: GetMembersByExhibitInput): Promise<Member[]> {
		const event = await this.eventRepository.findByExhibitId(input.exhibitId);
		if (!event) {
			throw new EventNotFoundException();
		}
		const members = await Promise.all(
			event
				.getMemberIds()
				.map((memberId) => this.memberRepository.findById(memberId)),
		);
		return members.filter((m): m is Member => m !== null);
	}
}
