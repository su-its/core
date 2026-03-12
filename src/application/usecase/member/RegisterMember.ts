import { v4 as uuid } from "uuid";
import { MemberEmailAlreadyExistsException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import {
	Department,
	DiscordAccount,
	Email,
	Member,
	type MemberRepository,
	StudentId,
	UniversityEmail,
} from "#domain";

export interface RegisterMemberInput {
	name: string;
	studentId: string;
	department: string;
	email: string;
	personalEmail?: string;
	discordInfo?: {
		accountId: string;
		nickName: string;
	};
}

export interface RegisterMemberOutput {
	member: Member;
}

export class RegisterMemberUseCase extends IUseCase<
	RegisterMemberInput,
	RegisterMemberOutput
> {
	constructor(private readonly memberRepo: MemberRepository) {
		super();
	}

	async execute(input: RegisterMemberInput): Promise<RegisterMemberOutput> {
		const existingMember = await this.memberRepo.findByEmail(input.email);
		if (existingMember) {
			throw new MemberEmailAlreadyExistsException(input.email);
		}

		const universityEmail = new UniversityEmail(input.email);
		const personalEmail = input.personalEmail
			? new Email(input.personalEmail)
			: undefined;

		const member = new Member(
			uuid(),
			input.name,
			StudentId.fromString(input.studentId),
			Department.fromString(input.department),
			universityEmail,
			personalEmail,
		);

		if (input.discordInfo) {
			const discordAccount = new DiscordAccount(
				input.discordInfo.accountId,
				input.discordInfo.nickName,
				member.id,
			);
			member.addDiscordAccount(discordAccount);
		}

		await this.memberRepo.save(member);

		return { member };
	}
}
