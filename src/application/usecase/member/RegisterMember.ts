import { v4 as uuid } from "uuid";
import { MemberEmailAlreadyExistsException } from "#application/exceptions";
import { IUseCase } from "#application/usecase/base";
import {
	ActiveMember,
	type Email,
	type Member,
	type MemberRepository,
	type UniversityEmail,
	memberId,
} from "#domain";
import type { Recorded } from "#domain/shared/Recorded";
import type { StudentId } from "#domain/shared/StudentId";
import type { Affiliation } from "#domain/shared/affiliation/Affiliation";

export interface RegisterMemberInput {
	name: string;
	studentId: StudentId;
	email: UniversityEmail;
	personalEmail: Recorded<Email>;
	affiliation: Affiliation;
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
		const existingMember = await this.memberRepo.findByEmail(
			input.email.getValue(),
		);
		if (existingMember) {
			throw new MemberEmailAlreadyExistsException(input.email.getValue());
		}

		const member = ActiveMember.register({
			id: memberId(uuid()),
			email: input.email,
			name: input.name,
			personalEmail: input.personalEmail,
			studentId: input.studentId,
			affiliation: input.affiliation,
		});

		await this.memberRepo.save(member);

		return { member };
	}
}
