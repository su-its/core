import type {
	EventId,
	EventRepository,
	Member,
	MemberRepository,
} from "#domain";
import { EventNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface GetMembersByEventInput {
	eventId: EventId;
}

export interface GetMembersByEventOutput {
	members: Member[];
}

export class GetMembersByEvent extends IUseCase<
	GetMembersByEventInput,
	GetMembersByEventOutput
> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly memberRepository: MemberRepository,
	) {
		super();
	}

	async execute(
		input: GetMembersByEventInput,
	): Promise<GetMembersByEventOutput> {
		const event = await this.eventRepository.findById(input.eventId);
		if (!event) {
			throw new EventNotFoundException(input.eventId);
		}
		const members = (
			await Promise.all(
				event
					.getMemberIds()
					.map((memberId) => this.memberRepository.findById(memberId)),
			)
		).filter((member) => member !== null);
		return { members };
	}
}
