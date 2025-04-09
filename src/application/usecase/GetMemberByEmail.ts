import type { Member } from "@/domain/member/Member";
import type { MemberRepository } from "@/domain/member/MemberRepository";

export class GetMemberByEmailUseCase {
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(input: {
		email: string;
	}): Promise<Member | null> {
		return await this.memberRepo.findByEmail(input.email);
	}
}
