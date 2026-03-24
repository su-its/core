import { InvalidAffiliationOperationException } from "#domain/exceptions";
import type { Recorded } from "#domain/shared/Recorded";
import type { StudentId } from "#domain/shared/StudentId";
import {
	type CompleteAffiliation,
	type CompleteDoctoralAffiliation,
	type CompleteMasterAffiliation,
	type CompleteProfessionalAffiliation,
	type CompleteUndergraduateAffiliation,
	affiliationTypeNames,
} from "#domain/shared/affiliation/Affiliation";
import type { Email } from "./Email.ts";
import {
	DepartmentTransferred,
	FacultyTransferred,
	InternallyAdvanced,
	MajorTransferred,
	MemberConfirmed,
	MemberRegistered,
	MemberRemoved,
	MemberReregistered,
	MemberUnconfirmed,
	NameChanged,
	PersonalEmailChanged,
	StudentIdChanged,
} from "./MemberEvent.ts";
import type { MemberDomainEvent, RemovalReason } from "./MemberEvent.ts";
import type { MemberId } from "./MemberId.ts";
import type { UniversityEmail } from "./UniversityEmail.ts";

// ── ActiveMember（室員） ──

export class ActiveMember {
	readonly status = "active" as const;

	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly name: string,
		readonly personalEmail: Recorded<Email>,
		readonly studentId: StudentId,
		readonly affiliation: CompleteAffiliation,
		private readonly domainEvents: readonly MemberDomainEvent[] = [],
	) {}

	static register(props: {
		id: MemberId;
		email: UniversityEmail;
		name: string;
		personalEmail: Recorded<Email>;
		studentId: StudentId;
		affiliation: CompleteAffiliation;
	}): ActiveMember {
		return new ActiveMember(
			props.id,
			props.email,
			props.name,
			props.personalEmail,
			props.studentId,
			props.affiliation,
			[
				new MemberRegistered(
					props.id,
					props.email,
					props.name,
					props.personalEmail,
					props.studentId,
					props.affiliation,
					new Date(),
				),
			],
		);
	}

	static reconstruct(props: {
		id: MemberId;
		email: UniversityEmail;
		name: string;
		personalEmail: Recorded<Email>;
		studentId: StudentId;
		affiliation: CompleteAffiliation;
	}): ActiveMember {
		return new ActiveMember(
			props.id,
			props.email,
			props.name,
			props.personalEmail,
			props.studentId,
			props.affiliation,
		);
	}

	remove(reason: RemovalReason): FormerMember {
		return new FormerMember(
			this.id,
			this.email,
			this.name,
			this.personalEmail,
			[
				...this.domainEvents,
				new MemberRemoved(this.id, this.email, reason, new Date()),
			],
		);
	}

	unconfirm(): UnconfirmedMember {
		return new UnconfirmedMember(
			this.id,
			this.email,
			this.name,
			this.personalEmail,
			[
				...this.domainEvents,
				new MemberUnconfirmed(this.id, this.email, new Date()),
			],
		);
	}

	changeName(newName: string): ActiveMember {
		return new ActiveMember(
			this.id,
			this.email,
			newName,
			this.personalEmail,
			this.studentId,
			this.affiliation,
			[
				...this.domainEvents,
				new NameChanged(this.id, this.email, this.name, newName, new Date()),
			],
		);
	}

	changePersonalEmail(newEmail: Recorded<Email>): ActiveMember {
		return new ActiveMember(
			this.id,
			this.email,
			this.name,
			newEmail,
			this.studentId,
			this.affiliation,
			[
				...this.domainEvents,
				new PersonalEmailChanged(
					this.id,
					this.email,
					this.personalEmail,
					newEmail,
					new Date(),
				),
			],
		);
	}

	changeStudentId(newStudentId: StudentId): ActiveMember {
		return new ActiveMember(
			this.id,
			this.email,
			this.name,
			this.personalEmail,
			newStudentId,
			this.affiliation,
			[
				...this.domainEvents,
				new StudentIdChanged(
					this.id,
					this.email,
					this.studentId,
					newStudentId,
					new Date(),
				),
			],
		);
	}

	advanceInternally(
		newAffiliation: CompleteMasterAffiliation | CompleteDoctoralAffiliation,
		newStudentId: StudentId,
	): ActiveMember {
		this.validateAdvancement(newAffiliation);

		return new ActiveMember(
			this.id,
			this.email,
			this.name,
			this.personalEmail,
			newStudentId,
			newAffiliation,
			[
				...this.domainEvents,
				new InternallyAdvanced(
					this.id,
					this.email,
					this.affiliation,
					newAffiliation,
					this.studentId,
					newStudentId,
					new Date(),
				),
			],
		);
	}

	transferFaculty(
		newAffiliation: CompleteUndergraduateAffiliation,
	): ActiveMember {
		if (this.affiliation.type !== "undergraduate") {
			throw new InvalidAffiliationOperationException(
				"転学部",
				affiliationTypeNames[this.affiliation.type],
				"学部生のみ可能です",
			);
		}

		return new ActiveMember(
			this.id,
			this.email,
			this.name,
			this.personalEmail,
			this.studentId,
			newAffiliation,
			[
				...this.domainEvents,
				new FacultyTransferred(
					this.id,
					this.email,
					this.affiliation,
					newAffiliation,
					new Date(),
				),
			],
		);
	}

	transferDepartment(
		newAffiliation: CompleteUndergraduateAffiliation,
	): ActiveMember {
		if (this.affiliation.type !== "undergraduate") {
			throw new InvalidAffiliationOperationException(
				"転学科",
				affiliationTypeNames[this.affiliation.type],
				"学部生のみ可能です",
			);
		}

		if (this.affiliation.value.faculty !== newAffiliation.value.faculty) {
			throw new InvalidAffiliationOperationException(
				"転学科",
				affiliationTypeNames[this.affiliation.type],
				`同一学部内でのみ可能です（現在: ${this.affiliation.value.faculty}）`,
			);
		}

		return new ActiveMember(
			this.id,
			this.email,
			this.name,
			this.personalEmail,
			this.studentId,
			newAffiliation,
			[
				...this.domainEvents,
				new DepartmentTransferred(
					this.id,
					this.email,
					this.affiliation,
					newAffiliation,
					new Date(),
				),
			],
		);
	}

	transferMajor(
		newAffiliation:
			| CompleteMasterAffiliation
			| CompleteDoctoralAffiliation
			| CompleteProfessionalAffiliation,
	): ActiveMember {
		if (this.affiliation.type === "undergraduate") {
			throw new InvalidAffiliationOperationException(
				"転専攻",
				affiliationTypeNames[this.affiliation.type],
				"大学院生のみ可能です",
			);
		}

		if (this.affiliation.value.school !== newAffiliation.value.school) {
			throw new InvalidAffiliationOperationException(
				"転専攻",
				affiliationTypeNames[this.affiliation.type],
				`同一研究科内でのみ可能です（現在: ${this.affiliation.value.school}）`,
			);
		}

		return new ActiveMember(
			this.id,
			this.email,
			this.name,
			this.personalEmail,
			this.studentId,
			newAffiliation,
			[
				...this.domainEvents,
				new MajorTransferred(
					this.id,
					this.email,
					this.affiliation,
					newAffiliation,
					new Date(),
				),
			],
		);
	}

	getDomainEvents(): readonly MemberDomainEvent[] {
		return [...this.domainEvents];
	}

	private validateAdvancement(
		newAffiliation: CompleteMasterAffiliation | CompleteDoctoralAffiliation,
	): void {
		if (this.affiliation.type === "undergraduate") {
			if (newAffiliation.type !== "master") {
				throw new InvalidAffiliationOperationException(
					"内部進学",
					affiliationTypeNames[this.affiliation.type],
					"学部生からは修士課程のみ可能です",
				);
			}
			return;
		}

		if (this.affiliation.type === "master") {
			if (newAffiliation.type !== "doctoral") {
				throw new InvalidAffiliationOperationException(
					"内部進学",
					affiliationTypeNames[this.affiliation.type],
					"修士からは博士課程のみ可能です",
				);
			}
			return;
		}

		throw new InvalidAffiliationOperationException(
			"内部進学",
			affiliationTypeNames[this.affiliation.type],
			"この課程からの内部進学はできません",
		);
	}
}

// ── UnconfirmedMember（未確認） ──

export class UnconfirmedMember {
	readonly status = "unconfirmed" as const;

	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly name: string,
		readonly personalEmail: Recorded<Email>,
		private readonly domainEvents: readonly MemberDomainEvent[] = [],
	) {}

	static reconstruct(props: {
		id: MemberId;
		email: UniversityEmail;
		name: string;
		personalEmail: Recorded<Email>;
	}): UnconfirmedMember {
		return new UnconfirmedMember(
			props.id,
			props.email,
			props.name,
			props.personalEmail,
		);
	}

	confirm(
		studentId: StudentId,
		affiliation: CompleteAffiliation,
	): ActiveMember {
		return new ActiveMember(
			this.id,
			this.email,
			this.name,
			this.personalEmail,
			studentId,
			affiliation,
			[
				...this.domainEvents,
				new MemberConfirmed(
					this.id,
					this.email,
					studentId,
					affiliation,
					new Date(),
				),
			],
		);
	}

	remove(reason: RemovalReason): FormerMember {
		return new FormerMember(
			this.id,
			this.email,
			this.name,
			this.personalEmail,
			[
				...this.domainEvents,
				new MemberRemoved(this.id, this.email, reason, new Date()),
			],
		);
	}

	changeName(newName: string): UnconfirmedMember {
		return new UnconfirmedMember(
			this.id,
			this.email,
			newName,
			this.personalEmail,
			[
				...this.domainEvents,
				new NameChanged(this.id, this.email, this.name, newName, new Date()),
			],
		);
	}

	changePersonalEmail(newEmail: Recorded<Email>): UnconfirmedMember {
		return new UnconfirmedMember(this.id, this.email, this.name, newEmail, [
			...this.domainEvents,
			new PersonalEmailChanged(
				this.id,
				this.email,
				this.personalEmail,
				newEmail,
				new Date(),
			),
		]);
	}

	getDomainEvents(): readonly MemberDomainEvent[] {
		return [...this.domainEvents];
	}
}

// ── FormerMember（元室員） ──

export class FormerMember {
	readonly status = "former" as const;

	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly name: string,
		readonly personalEmail: Recorded<Email>,
		private readonly domainEvents: readonly MemberDomainEvent[] = [],
	) {}

	static reconstruct(props: {
		id: MemberId;
		email: UniversityEmail;
		name: string;
		personalEmail: Recorded<Email>;
	}): FormerMember {
		return new FormerMember(
			props.id,
			props.email,
			props.name,
			props.personalEmail,
		);
	}

	reregister(
		studentId: StudentId,
		affiliation: CompleteAffiliation,
	): ActiveMember {
		return new ActiveMember(
			this.id,
			this.email,
			this.name,
			this.personalEmail,
			studentId,
			affiliation,
			[
				...this.domainEvents,
				new MemberReregistered(
					this.id,
					this.email,
					studentId,
					affiliation,
					new Date(),
				),
			],
		);
	}

	changeName(newName: string): FormerMember {
		return new FormerMember(this.id, this.email, newName, this.personalEmail, [
			...this.domainEvents,
			new NameChanged(this.id, this.email, this.name, newName, new Date()),
		]);
	}

	changePersonalEmail(newEmail: Recorded<Email>): FormerMember {
		return new FormerMember(this.id, this.email, this.name, newEmail, [
			...this.domainEvents,
			new PersonalEmailChanged(
				this.id,
				this.email,
				this.personalEmail,
				newEmail,
				new Date(),
			),
		]);
	}

	getDomainEvents(): readonly MemberDomainEvent[] {
		return [...this.domainEvents];
	}
}

/** Member集約 — 室員・未確認・元室員のいずれかの状態を取る */
export type Member = ActiveMember | UnconfirmedMember | FormerMember;
