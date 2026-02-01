import type {
	EventRepository,
	Member,
	MemberRepository,
} from "#domain/index.js";
import { ExhibitNotFoundFromExhibitIdException } from "#application/exceptions/index.js";
import { IUseCase } from "#application/usecase/base.js";

export interface GetMembersByExhibitInput {
	exhibitId: string;
}

export interface GetMembersByExhibitOutput {
	members: Member[];
}

export class GetMembersByExhibit extends IUseCase<
	GetMembersByExhibitInput,
	GetMembersByExhibitOutput
> {
	constructor(
		private readonly memberRepository: MemberRepository,
		private readonly eventRepository: EventRepository,
	) {
		super();
	}

	async execute(
		input: GetMembersByExhibitInput,
	): Promise<GetMembersByExhibitOutput> {
		const event = await this.eventRepository.findByExhibitId(input.exhibitId);
		if (!event) {
			throw new ExhibitNotFoundFromExhibitIdException(input.exhibitId);
		}
		const memberResults = await Promise.all(
			event
				.getMemberIds()
				.map((memberId) => this.memberRepository.findById(memberId)),
		);
		const members = memberResults.filter((m): m is Member => m !== null);
		return { members };
	}
}
