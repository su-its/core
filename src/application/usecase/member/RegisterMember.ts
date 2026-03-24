import { v4 as uuid } from "uuid";
import {
	ActiveMember,
	type CompleteAffiliation,
	type Email,
	type Member,
	type MemberRepository,
	type Recorded,
	type StudentId,
	type UniversityEmail,
	memberId,
} from "#domain";
import { MemberEmailAlreadyExistsException } from "../../exceptions";
import { IUseCase } from "../base";

export interface RegisterMemberInput {
	name: string;
	studentId: StudentId;
	email: UniversityEmail;
	personalEmail: Recorded<Email>;
	affiliation: CompleteAffiliation;
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
