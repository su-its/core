import type { DiscordAccountRepository, MemberId, MemberRepository } from "#domain";
import { toDiscordAccountDTO, toMemberDTO } from "../../dto";
import { IUseCase } from "../base";
import type { MemberWithDiscordAccounts } from "../../dto";

export interface GetMemberWithDiscordAccountsInput {
	id: MemberId;
}

export interface GetMemberWithDiscordAccountsOutput {
	member: MemberWithDiscordAccounts | null;
}

export class GetMemberWithDiscordAccountsUseCase extends IUseCase<
	GetMemberWithDiscordAccountsInput,
	GetMemberWithDiscordAccountsOutput
> {
	constructor(
		private readonly memberRepo: MemberRepository,
		private readonly discordRepo: DiscordAccountRepository,
	) {
		super();
	}

	async execute(
		input: GetMemberWithDiscordAccountsInput,
	): Promise<GetMemberWithDiscordAccountsOutput> {
		const member = await this.memberRepo.findById(input.id);
		if (!member) {
			return { member: null };
		}

		const discordAccounts = await this.discordRepo.findByMemberId(member.id);

		return {
			member: {
				...toMemberDTO(member),
				discordAccounts: discordAccounts.map(toDiscordAccountDTO),
			},
		};
	}
}
