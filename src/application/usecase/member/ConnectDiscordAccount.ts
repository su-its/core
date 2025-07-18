import {
	DiscordAccount,
	type Member,
	type MemberRepository,
} from "../../../domain";
import { MemberNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ConnectDiscordAccountInput {
	memberId: string;
	discordAccountId: string;
	discordNickName?: string;
}

export interface ConnectDiscordAccountOutput {
	member: Member;
}

export class ConnectDiscordAccountUseCase extends IUseCase<
	ConnectDiscordAccountInput,
	ConnectDiscordAccountOutput
> {
	constructor(private readonly memberRepo: MemberRepository) {
		super();
	}

	async execute(
		input: ConnectDiscordAccountInput,
	): Promise<ConnectDiscordAccountOutput> {
		const member = await this.memberRepo.findById(input.memberId);
		if (!member) {
			throw new MemberNotFoundException(input.memberId);
		}

		const discordAccount = new DiscordAccount(
			input.discordAccountId,
			input.discordNickName ?? "",
			member.id,
		);

		member.addDiscordAccount(discordAccount);

		await this.memberRepo.save(member);

		return { member };
	}
}
