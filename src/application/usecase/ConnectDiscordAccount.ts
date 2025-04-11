import { DiscordAccount } from "@/domain/member/DiscordAccount";
import type { Member } from "@/domain/member/Member";
import type { MemberRepository } from "@/domain/member/MemberRepository";
import { MemberNotFoundException } from "../exceptions/ApplicationExceptions";

export class ConnectDiscordAccountUseCase {
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(input: {
		memberId: string;
		discordAccountId: string;
		discordNickName: string;
	}): Promise<Member> {
		const member = await this.memberRepo.findById(input.memberId);
		if (!member) {
			throw new MemberNotFoundException();
		}

		const discordAccount = new DiscordAccount(
			input.discordAccountId,
			input.discordNickName,
			member.id,
		);

		member.addDiscordAccount(discordAccount);

		await this.memberRepo.save(member);

		return member;
	}
}
