import type { Member } from "@/domain/member/Member";
import type { MemberRepository } from "@/domain/member/MemberRepository";
import {
	DiscordAccountNotConnectedException,
	MemberNotFoundException,
} from "../exceptions/ApplicationExceptions";

export class ChangeDiscordNickNameUseCase {
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(input: {
		discordAccountId: string;
		discordNickName: string;
	}): Promise<Member> {
		const member = await this.memberRepo.findByDiscordAccountId(
			input.discordAccountId,
		);
		if (!member) {
			throw new MemberNotFoundException();
		}

		const discordAccount = member.getDiscordAccountById(input.discordAccountId);
		if (!discordAccount) {
			throw new DiscordAccountNotConnectedException();
		}

		discordAccount.setNickName(input.discordNickName);

		await this.memberRepo.save(member);

		return member;
	}
}
