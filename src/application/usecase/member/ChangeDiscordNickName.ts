import type { Member, MemberRepository } from "../../../domain";
import {
	DiscordAccountNotConnectedException,
	MemberNotFoundFromDiscordAccountIdException,
} from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeDiscordNickNameInput {
	discordAccountId: string;
	discordNickName: string;
}

export interface ChangeDiscordNickNameOutput {
	member: Member;
}

export class ChangeDiscordNickNameUseCase extends IUseCase<
	ChangeDiscordNickNameInput,
	ChangeDiscordNickNameOutput
> {
	constructor(private readonly memberRepo: MemberRepository) {
		super();
	}

	async execute(
		input: ChangeDiscordNickNameInput,
	): Promise<ChangeDiscordNickNameOutput> {
		const member = await this.memberRepo.findByDiscordAccountId(
			input.discordAccountId,
		);
		if (!member) {
			throw new MemberNotFoundFromDiscordAccountIdException(
				input.discordAccountId,
			);
		}

		const discordAccount = member.getDiscordAccountById(input.discordAccountId);
		if (!discordAccount) {
			throw new DiscordAccountNotConnectedException(
				member.id,
				input.discordAccountId,
			);
		}

		discordAccount.setNickName(input.discordNickName);

		await this.memberRepo.save(member);

		return { member };
	}
}
