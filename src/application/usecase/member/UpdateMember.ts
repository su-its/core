import { MemberNotFoundException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import type { Email, Member, MemberId, MemberRepository } from "#domain";
import type { Recorded } from "#domain/shared/Recorded";
import type { StudentId } from "#domain/shared/StudentId";

export interface UpdateMemberInput {
	memberId: MemberId;
	name?: string;
	studentId?: StudentId;
	personalEmail?: Recorded<Email>;
}

export interface UpdateMemberOutput {
	member: Member;
}

export class UpdateMemberUseCase extends IUseCase<
	UpdateMemberInput,
	UpdateMemberOutput
> {
	constructor(private readonly memberRepo: MemberRepository) {
		super();
	}

	async execute(input: UpdateMemberInput): Promise<UpdateMemberOutput> {
		const member = await this.memberRepo.findById(input.memberId);
		if (!member) {
			throw new MemberNotFoundException(input.memberId);
		}

		if (member.status !== "active") {
			throw new Error("室員のみ更新可能です");
		}

		let updated: Member = member;

		if (input.name !== undefined) {
			updated = updated.changeName(input.name);
		}
		if (input.studentId !== undefined) {
			updated = (updated as import("#domain").ActiveMember).changeStudentId(
				input.studentId,
			);
		}
		if (input.personalEmail !== undefined) {
			updated = updated.changePersonalEmail(input.personalEmail);
		}

		await this.memberRepo.save(updated);

		return { member: updated };
	}
}
