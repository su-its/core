import type { Member } from "@/domain/member/Member";
import type { MemberRepository } from "@/domain/member/MemberRepository";

export class GetMemberUseCase {
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(input: {
		id: string;
	}): Promise<Member | null> {
		return await this.memberRepo.findById(input.id);
	}
}
