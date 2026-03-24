import type {
	DiscordAccount,
	DiscordAccountRepository,
	DiscordId,
} from "#domain";
import { DiscordAccountNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface ChangeDiscordNickNameInput {
	discordAccountId: DiscordId;
	discordNickName: string;
}

export interface ChangeDiscordNickNameOutput {
	discordAccount: DiscordAccount;
}

export class ChangeDiscordNickNameUseCase extends IUseCase<
	ChangeDiscordNickNameInput,
	ChangeDiscordNickNameOutput
> {
	constructor(private readonly discordRepo: DiscordAccountRepository) {
		super();
	}

	async execute(
		input: ChangeDiscordNickNameInput,
	): Promise<ChangeDiscordNickNameOutput> {
		const account = await this.discordRepo.findByDiscordId(
			input.discordAccountId,
		);
		if (!account) {
			throw new DiscordAccountNotFoundException(input.discordAccountId);
		}

		const updated = account.changeNickName(input.discordNickName);
		await this.discordRepo.save(updated);

		return { discordAccount: updated };
	}
}
