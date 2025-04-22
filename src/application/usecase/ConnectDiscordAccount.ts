import {
	DiscordAccount,
	type Member,
	type MemberRepository,
} from "../../domain";
import { MemberNotFoundException } from "../exceptions/ApplicationExceptions";
import type { IUseCase } from "./BaseUseCase";

export interface ConnectDiscordAccountInput {
	memberId: string;
	discordAccountId: string;
	discordNickName?: string;
}

export type ConnectDiscordAccountOutput = Member;

export class ConnectDiscordAccountUseCase
	implements IUseCase<ConnectDiscordAccountInput, ConnectDiscordAccountOutput>
{
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(
		input: ConnectDiscordAccountInput,
	): Promise<ConnectDiscordAccountOutput> {
		const member = await this.memberRepo.findById(input.memberId);
		if (!member) {
			throw new MemberNotFoundException();
		}

		const discordAccount = new DiscordAccount(
			input.discordAccountId,
			input.discordNickName ?? "",
			member.id,
		);

		member.addDiscordAccount(discordAccount);

		await this.memberRepo.save(member);

		return member;
	}
}
