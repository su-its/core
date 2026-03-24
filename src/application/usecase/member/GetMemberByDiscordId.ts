import { IUseCase } from "#application/usecase/base";
import type {
	DiscordAccountRepository,
	DiscordId,
	Member,
	MemberRepository,
} from "#domain";

export interface GetMemberByDiscordIdInput {
	discordId: DiscordId;
}

export interface GetMemberByDiscordIdOutput {
	member: Member | null;
}

export class GetMemberByDiscordIdUseCase extends IUseCase<
	GetMemberByDiscordIdInput,
	GetMemberByDiscordIdOutput
> {
	constructor(
		private readonly discordRepo: DiscordAccountRepository,
		private readonly memberRepo: MemberRepository,
	) {
		super();
	}

	async execute(
		input: GetMemberByDiscordIdInput,
	): Promise<GetMemberByDiscordIdOutput> {
		const account = await this.discordRepo.findByDiscordId(input.discordId);
		if (!account) {
			return { member: null };
		}

		const member = await this.memberRepo.findById(account.memberId);
		return { member };
	}
}
