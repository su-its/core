import type { Member, MemberRepository } from "../../../domain";
import { IUseCase } from "../base";

export interface GetMemberByDiscordIdInput {
	discordId: string;
}

export interface GetMemberByDiscordIdOutput {
	member: Member | null;
}

export class GetMemberByDiscordIdUseCase extends IUseCase<
	GetMemberByDiscordIdInput,
	GetMemberByDiscordIdOutput
> {
	constructor(private readonly memberRepo: MemberRepository) {
		super();
	}

	async execute(
		input: GetMemberByDiscordIdInput,
	): Promise<GetMemberByDiscordIdOutput> {
		const member = await this.memberRepo.findByDiscordAccountId(
			input.discordId,
		);
		return { member };
	}
}
