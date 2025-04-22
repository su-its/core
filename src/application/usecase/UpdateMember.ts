import { DiscordAccount } from "@/domain/member/DiscordAccount";
import type { Member } from "@/domain/member/Member";
import type { MemberRepository } from "@/domain/member/MemberRepository";
import { Email } from "@/domain/value-objects/Email";
import { UniversityEmail } from "@/domain/value-objects/UniversityEmail";
import { MemberNotFoundException } from "../exceptions/ApplicationExceptions";
import { Department } from "@/domain/value-objects/Departments";

export class UpdateMemberUseCase {
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(input: {
		memberId: string;
		name?: string;
		studentId?: string;
		department?: "CS" | "BI" | "IA"; // departmentはユニオン型
		email?: string;
		personalEmail?: string;
		discordAccountId?: string;
		discordNickName?: string;
	}): Promise<Member> {
		const member = await this.memberRepo.findById(input.memberId);
		if (!member) {
			throw new MemberNotFoundException();
		}

		if (input.name) {
			member.setName(input.name);
		}
		if (input.studentId) {
			member.setStudentId(input.studentId);
		}
		if (input.department) {
			member.setDepartment(Department.fromString(input.department));
		}
		if (input.email) {
			member.setEmail(new UniversityEmail(input.email));
		}
		if (input.personalEmail) {
			member.setPersonalEmail(new Email(input.personalEmail));
		}

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
