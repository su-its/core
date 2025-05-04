import type { Member, MemberRepository } from "../../../domain";
import type { IUseCase } from "../base";

export interface GetMemberByDiscordIdInput {
	discordId: string;
}

export type GetMemberByDiscordIdOutput = Member | null;

export class GetMemberByDiscordIdUseCase
	implements IUseCase<GetMemberByDiscordIdInput, GetMemberByDiscordIdOutput>
{
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(
		input: GetMemberByDiscordIdInput,
	): Promise<GetMemberByDiscordIdOutput> {
		return await this.memberRepo.findByDiscordAccountId(input.discordId);
	}
}
