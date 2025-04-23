import type { Member, MemberRepository } from "../../domain";
import {
	DiscordAccountNotConnectedException,
	MemberNotFoundException,
} from "../exceptions/ApplicationExceptions";
import type { IUseCase } from "./BaseUseCase";

export interface ChangeDiscordNickNameInput {
	discordAccountId: string;
	discordNickName: string;
}

export type ChangeDiscordNickNameOutput = Member;

export class ChangeDiscordNickNameUseCase
	implements IUseCase<ChangeDiscordNickNameInput, ChangeDiscordNickNameOutput>
{
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(
		input: ChangeDiscordNickNameInput,
	): Promise<ChangeDiscordNickNameOutput> {
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
