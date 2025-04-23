import type { Member, MemberRepository } from "../../domain";
import type { IUseCase } from "./BaseUseCase";

export interface GetMemberInput {
	id: string;
}

export type GetMemberOutput = Member | null;

export class GetMemberUseCase
	implements IUseCase<GetMemberInput, GetMemberOutput>
{
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(input: GetMemberInput): Promise<GetMemberOutput> {
		return await this.memberRepo.findById(input.id);
	}
}
