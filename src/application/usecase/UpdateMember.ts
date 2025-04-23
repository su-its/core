import {
	Department,
	DiscordAccount,
	Email,
	type Member,
	type MemberRepository,
	UniversityEmail,
} from "../../domain";
import { MemberNotFoundException } from "../exceptions/ApplicationExceptions";
import type { IUseCase } from "./BaseUseCase";

export interface UpdateMemberInput {
	memberId: string;
	name?: string;
	studentId?: string;
	department?: string;
	email?: string;
	personalEmail?: string;
	discordAccountId?: string;
	discordNickName?: string;
}

export type UpdateMemberOutput = Member;

export class UpdateMemberUseCase
	implements IUseCase<UpdateMemberInput, UpdateMemberOutput>
{
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(input: {
		memberId: string;
		name?: string;
		studentId?: string;
		department?: string;
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
