import type { Member, MemberRepository } from "../../../domain";
import { IUseCase } from "../base";

export type GetMemberListInput = Record<string, never>;

export interface GetMemberListOutput {
	members: Member[];
}

export class GetMemberListUseCase extends IUseCase<
	GetMemberListInput,
	GetMemberListOutput
> {
	constructor(private readonly memberRepo: MemberRepository) {
		super();
	}

	async execute(_input: GetMemberListInput): Promise<GetMemberListOutput> {
		const members = await this.memberRepo.findAll();
		return { members };
	}
}
