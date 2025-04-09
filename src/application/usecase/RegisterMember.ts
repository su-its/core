import { MemberEmailAlreadyExistsException } from "@/application/exceptions/ApplicationExceptions";
import { DiscordAccount } from "@/domain/member/DiscordAccount";
import { Member } from "@/domain/member/Member";
import type { MemberRepository } from "@/domain/member/MemberRepository";
import { Email } from "@/domain/value-objects/Email";
import { UniversityEmail } from "@/domain/value-objects/UniversityEmail";
import { v4 as uuid } from "uuid";

export class RegisterMemberUseCase {
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(input: {
		name: string;
		studentId: string;
		department: "CS" | "BI" | "IA"; // departmentはユニオン型
		email: string;
		personalEmail?: string;
		discordAccountId?: string;
		discordNickName?: string;
	}): Promise<Member> {
		// TODO: この入力値のバリデーションはUsecaseが本来着目するべき処理の流れという関心事では無い
		if (input.discordNickName) {
			if (!input.discordAccountId) {
				throw new Error(
					"discordNickNameを指定する場合はdiscordAccountIdも指定してください",
				);
			}
		}
		const existingMember = await this.memberRepo.findByEmail(input.email);
		if (existingMember) {
			throw new MemberEmailAlreadyExistsException();
		}

		const universityEmail = new UniversityEmail(input.email);
		const personalEmail = input.personalEmail
			? new Email(input.personalEmail)
			: undefined;

		const member = new Member(
			uuid(),
			input.name,
			input.studentId,
			input.department,
			universityEmail,
			personalEmail,
		);

		if (input.discordAccountId && input.discordNickName) {
			const discordAccount = new DiscordAccount(
				input.discordAccountId,
				input.discordNickName,
				member.id,
			);
			member.addDiscordAccount(discordAccount);
		}

		await this.memberRepo.save(member);

		return member;
	}
}
