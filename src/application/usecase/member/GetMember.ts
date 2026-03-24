import type { Member, MemberId, MemberRepository } from "#domain";
import { IUseCase } from "../base";

export interface GetMemberInput {
	id: MemberId;
}

export interface GetMemberOutput {
	member: Member | null;
}

export class GetMemberUseCase extends IUseCase<GetMemberInput, GetMemberOutput> {
	constructor(private readonly memberRepo: MemberRepository) {
		super();
	}

	async execute(input: GetMemberInput): Promise<GetMemberOutput> {
		const member = await this.memberRepo.findById(input.id);
		return { member };
	}
}
