import { IUseCase } from "#application/usecase/base";
import type { Member, MemberRepository } from "#domain";

export interface GetMemberByEmailInput {
	email: string;
}

export interface GetMemberByEmailOutput {
	member: Member | null;
}

export class GetMemberByEmailUseCase extends IUseCase<
	GetMemberByEmailInput,
	GetMemberByEmailOutput
> {
	constructor(private readonly memberRepo: MemberRepository) {
		super();
	}

	async execute(input: GetMemberByEmailInput): Promise<GetMemberByEmailOutput> {
		const member = await this.memberRepo.findByEmail(input.email);
		return { member };
	}
}
