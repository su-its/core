import type { DiscordAccount, DiscordAccountRepository, Member, MemberRepository } from "#domain";
import { IUseCase } from "../base";

export type ListMembersWithDiscordAccountsInput = Record<string, never>;

export interface MemberWithDiscordAccounts {
	member: Member;
	discordAccounts: DiscordAccount[];
}

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

		const accountsByMemberId = new Map<string, DiscordAccount[]>();
		for (const account of allDiscordAccounts) {
			const key = account.memberId as string;
			const existing = accountsByMemberId.get(key) ?? [];
			existing.push(account);
			accountsByMemberId.set(key, existing);
		}

		return {
			entries: members.map((member) => ({
				member,
				discordAccounts: accountsByMemberId.get(member.id as string) ?? [],
			})),
		};
	}
}
