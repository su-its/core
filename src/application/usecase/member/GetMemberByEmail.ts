import type { Member, MemberRepository } from "../../../domain";
import type { IUseCase } from "../base";

export interface GetMemberByEmailInput {
	email: string;
}

export type GetMemberByEmailOutput = Member | null;

export class GetMemberByEmailUseCase
	implements IUseCase<GetMemberByEmailInput, GetMemberByEmailOutput>
{
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(input: GetMemberByEmailInput): Promise<GetMemberByEmailOutput> {
		return await this.memberRepo.findByEmail(input.email);
	}
}
