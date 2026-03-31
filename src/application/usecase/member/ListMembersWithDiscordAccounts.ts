import type { DiscordAccountRepository, MemberId, MemberRepository } from "#domain";
import type { DiscordAccountDTO, MemberDTO } from "../../dto";
import { toDiscordAccountDTO, toMemberDTO } from "../../dto";
import { IUseCase } from "../base";

export type ListMembersWithDiscordAccountsInput = Record<string, never>;

export type MemberWithDiscordAccounts = MemberDTO & {
	discordAccounts: DiscordAccountDTO[];
};

export interface ListMembersWithDiscordAccountsOutput {
	entries: MemberWithDiscordAccounts[];
}

export class ListMembersWithDiscordAccountsUseCase extends IUseCase<
	ListMembersWithDiscordAccountsInput,
	ListMembersWithDiscordAccountsOutput
> {
	constructor(
		private readonly memberRepo: MemberRepository,
		private readonly discordRepo: DiscordAccountRepository,
	) {
		super();
	}

	async execute(
		_input: ListMembersWithDiscordAccountsInput,
	): Promise<ListMembersWithDiscordAccountsOutput> {
		const [members, allDiscordAccounts] = await Promise.all([
			this.memberRepo.findAll(),
			this.discordRepo.findAll(),
		]);

		const accountsByMemberId = new Map<MemberId, DiscordAccountDTO[]>();
		for (const account of allDiscordAccounts) {
			const existing = accountsByMemberId.get(account.memberId) ?? [];
			existing.push(toDiscordAccountDTO(account));
			accountsByMemberId.set(account.memberId, existing);
		}

		return {
			entries: members.map((member) => ({
				...toMemberDTO(member),
				discordAccounts: accountsByMemberId.get(member.id) ?? [],
			})),
		};
	}
}
