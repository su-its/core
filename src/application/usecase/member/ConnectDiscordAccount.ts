import { MemberNotFoundException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import {
	DiscordAccount,
	type DiscordAccountRepository,
	type DiscordId,
	type MemberId,
	type MemberRepository,
} from "#domain";

export interface ConnectDiscordAccountInput {
	memberId: MemberId;
	discordAccountId: DiscordId;
	discordNickName: string;
}

export interface ConnectDiscordAccountOutput {
	discordAccount: DiscordAccount;
}

export class ConnectDiscordAccountUseCase extends IUseCase<
	ConnectDiscordAccountInput,
	ConnectDiscordAccountOutput
> {
	constructor(
		private readonly memberRepo: MemberRepository,
		private readonly discordRepo: DiscordAccountRepository,
	) {
		super();
	}

	async execute(
		input: ConnectDiscordAccountInput,
	): Promise<ConnectDiscordAccountOutput> {
		const member = await this.memberRepo.findById(input.memberId);
		if (!member) {
			throw new MemberNotFoundException(input.memberId);
		}

		const discordAccount = DiscordAccount.link(
			input.discordAccountId,
			input.memberId,
			input.discordNickName,
		);

		await this.discordRepo.save(discordAccount);

		return { discordAccount };
	}
}
