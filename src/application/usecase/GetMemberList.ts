import type { Member } from "@/domain/member/Member";
import type { MemberRepository } from "@/domain/member/MemberRepository";

export class GetMemberListUseCase {
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(): Promise<Member[]> {
		return await this.memberRepo.findAll();
	}
}
