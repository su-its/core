import type { DomainEvent } from "#domain/base/DomainEvent";
import type { Recorded } from "#domain/shared/Recorded";
import type { StudentId } from "#domain/shared/StudentId";
import type {
	CompleteAffiliation,
	CompleteDoctoralAffiliation,
	CompleteMasterAffiliation,
	CompleteProfessionalAffiliation,
	CompleteUndergraduateAffiliation,
} from "#domain/shared/affiliation/Affiliation";
import type { Email } from "./Email.ts";
import type { MemberId } from "./MemberId.ts";
import type { UniversityEmail } from "./UniversityEmail.ts";

/** 除籍理由 */
export type RemovalReason =
	| "graduation"
	| "externalAdvancement"
	| "noResponse"
	| "voluntaryLeave";

/** 室員登録 */
export class MemberRegistered implements DomainEvent {
	readonly eventName = "MemberRegistered" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly name: string,
		readonly personalEmail: Recorded<Email>,
		readonly studentId: StudentId,
		readonly affiliation: CompleteAffiliation,
		readonly occurredAt: Date,
	) {}
}

/** 除籍 */
export class MemberRemoved implements DomainEvent {
	readonly eventName = "MemberRemoved" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly reason: RemovalReason,
		readonly occurredAt: Date,
	) {}
}

/** 再登録 */
export class MemberReregistered implements DomainEvent {
	readonly eventName = "MemberReregistered" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly studentId: StudentId,
		readonly affiliation: CompleteAffiliation,
		readonly occurredAt: Date,
	) {}
}

/** 年次確認未返答による未確認状態への移行 */
export class MemberUnconfirmed implements DomainEvent {
	readonly eventName = "MemberUnconfirmed" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly occurredAt: Date,
	) {}
}

/** 未確認状態からの復帰 */
export class MemberConfirmed implements DomainEvent {
	readonly eventName = "MemberConfirmed" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly studentId: StudentId,
		readonly affiliation: CompleteAffiliation,
		readonly occurredAt: Date,
	) {}
}

/** 内部進学 */
export class InternallyAdvanced implements DomainEvent {
	readonly eventName = "InternallyAdvanced" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly previousAffiliation: CompleteAffiliation,
		readonly newAffiliation:
			| CompleteMasterAffiliation
			| CompleteDoctoralAffiliation,
		readonly previousStudentId: StudentId,
		readonly newStudentId: StudentId,
		readonly occurredAt: Date,
	) {}
}

/** 転学部 */
export class FacultyTransferred implements DomainEvent {
	readonly eventName = "FacultyTransferred" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly previousAffiliation: CompleteUndergraduateAffiliation,
		readonly newAffiliation: CompleteUndergraduateAffiliation,
		readonly occurredAt: Date,
	) {}
}

/** 転学科 */
export class DepartmentTransferred implements DomainEvent {
	readonly eventName = "DepartmentTransferred" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly previousAffiliation: CompleteUndergraduateAffiliation,
		readonly newAffiliation: CompleteUndergraduateAffiliation,
		readonly occurredAt: Date,
	) {}
}

/** 転専攻 */
export class MajorTransferred implements DomainEvent {
	readonly eventName = "MajorTransferred" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly previousAffiliation:
			| CompleteMasterAffiliation
			| CompleteDoctoralAffiliation
			| CompleteProfessionalAffiliation,
		readonly newAffiliation:
			| CompleteMasterAffiliation
			| CompleteDoctoralAffiliation
			| CompleteProfessionalAffiliation,
		readonly occurredAt: Date,
	) {}
}

/** 学籍番号変更 */
export class StudentIdChanged implements DomainEvent {
	readonly eventName = "StudentIdChanged" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly previousStudentId: StudentId,
		readonly newStudentId: StudentId,
		readonly occurredAt: Date,
	) {}
}

/** 名前変更 */
export class NameChanged implements DomainEvent {
	readonly eventName = "NameChanged" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly previousName: string,
		readonly newName: string,
		readonly occurredAt: Date,
	) {}
}

/** 個人メールアドレス変更 */
export class PersonalEmailChanged implements DomainEvent {
	readonly eventName = "PersonalEmailChanged" as const;
	constructor(
		readonly id: MemberId,
		readonly email: UniversityEmail,
		readonly previousPersonalEmail: Recorded<Email>,
		readonly newPersonalEmail: Recorded<Email>,
		readonly occurredAt: Date,
	) {}
}

/** Member集約で発生しうるすべてのドメインイベント */
export type MemberDomainEvent =
	| MemberRegistered
	| MemberRemoved
	| MemberReregistered
	| MemberUnconfirmed
	| MemberConfirmed
	| InternallyAdvanced
	| FacultyTransferred
	| DepartmentTransferred
	| MajorTransferred
	| StudentIdChanged
	| NameChanged
	| PersonalEmailChanged;
