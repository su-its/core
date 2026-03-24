import type { Email, Member, MemberId, MemberRepository, Recorded, StudentId } from "#domain";
import { MemberNotActiveException, MemberNotFoundException } from "../../exceptions";
import { IUseCase } from "../base";

export interface UpdateMemberInput {
	memberId: MemberId;
	name?: string;
	studentId?: StudentId;
	personalEmail?: Recorded<Email>;
}

export interface UpdateMemberOutput {
	member: Member;
}

export class UpdateMemberUseCase extends IUseCase<UpdateMemberInput, UpdateMemberOutput> {
	constructor(private readonly memberRepo: MemberRepository) {
		super();
	}

	async execute(input: UpdateMemberInput): Promise<UpdateMemberOutput> {
		const member = await this.memberRepo.findById(input.memberId);
		if (!member) {
			throw new MemberNotFoundException(input.memberId);
		}

		if (member.status !== "active") {
			throw new MemberNotActiveException(input.memberId, member.status);
		}

		let updated = member;

		if (input.name !== undefined) {
			updated = updated.changeName(input.name);
		}
		if (input.studentId !== undefined) {
			updated = updated.changeStudentId(input.studentId);
		}
		if (input.personalEmail !== undefined) {
			updated = updated.changePersonalEmail(input.personalEmail);
		}

		await this.memberRepo.save(updated);

		return { member: updated };
	}
}
