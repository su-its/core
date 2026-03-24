import type { DomainEvent } from "../../base";
import type { Recorded } from "../../shared";
import type { StudentId } from "../../shared";
import type {
	CompleteAffiliation,
	CompleteDoctoralAffiliation,
	CompleteMasterAffiliation,
	CompleteProfessionalAffiliation,
	CompleteUndergraduateAffiliation,
} from "../../shared";
import type { Email } from "./Email";
import type { MemberId } from "./MemberId";
import type { UniversityEmail } from "./UniversityEmail";

/** 除籍理由 */
export type RemovalReason =
	| "graduation"
	| "externalAdvancement"
	| "noResponse"
	| "voluntaryLeave";

/** 室員登録 */
export type MemberRegistered = DomainEvent & {
	readonly eventName: "MemberRegistered";
	readonly id: MemberId;
	readonly email: UniversityEmail;
	readonly name: string;
	readonly personalEmail: Recorded<Email>;
	readonly studentId: StudentId;
	readonly affiliation: CompleteAffiliation;
};

/** 除籍 */
export type MemberRemoved = DomainEvent & {
	readonly eventName: "MemberRemoved";
	readonly id: MemberId;
	readonly email: UniversityEmail;
	readonly reason: RemovalReason;
};

/** 再登録 */
export type MemberReregistered = DomainEvent & {
	readonly eventName: "MemberReregistered";
	readonly id: MemberId;
	readonly email: UniversityEmail;
	readonly studentId: StudentId;
	readonly affiliation: CompleteAffiliation;
};

/** 年次確認未返答による未確認状態への移行 */
export type MemberUnconfirmed = DomainEvent & {
	readonly eventName: "MemberUnconfirmed";
	readonly id: MemberId;
	readonly email: UniversityEmail;
};

/** 未確認状態からの復帰 */
export type MemberConfirmed = DomainEvent & {
	readonly eventName: "MemberConfirmed";
	readonly id: MemberId;
	readonly email: UniversityEmail;
	readonly studentId: StudentId;
	readonly affiliation: CompleteAffiliation;
};

/** 内部進学 */
export type InternallyAdvanced = DomainEvent & {
	readonly eventName: "InternallyAdvanced";
	readonly id: MemberId;
	readonly email: UniversityEmail;
	readonly previousAffiliation: CompleteAffiliation;
	readonly newAffiliation:
		| CompleteMasterAffiliation
		| CompleteDoctoralAffiliation;
	readonly previousStudentId: StudentId;
	readonly newStudentId: StudentId;
};

/** 転学部 */
export type FacultyTransferred = DomainEvent & {
	readonly eventName: "FacultyTransferred";
	readonly id: MemberId;
	readonly email: UniversityEmail;
	readonly previousAffiliation: CompleteUndergraduateAffiliation;
	readonly newAffiliation: CompleteUndergraduateAffiliation;
};

/** 転学科 */
export type DepartmentTransferred = DomainEvent & {
	readonly eventName: "DepartmentTransferred";
	readonly id: MemberId;
	readonly email: UniversityEmail;
	readonly previousAffiliation: CompleteUndergraduateAffiliation;
	readonly newAffiliation: CompleteUndergraduateAffiliation;
};

/** 転専攻 */
export type MajorTransferred = DomainEvent & {
	readonly eventName: "MajorTransferred";
	readonly id: MemberId;
	readonly email: UniversityEmail;
	readonly previousAffiliation:
		| CompleteMasterAffiliation
		| CompleteDoctoralAffiliation
		| CompleteProfessionalAffiliation;
	readonly newAffiliation:
		| CompleteMasterAffiliation
		| CompleteDoctoralAffiliation
		| CompleteProfessionalAffiliation;
};

/** 学籍番号変更 */
export type StudentIdChanged = DomainEvent & {
	readonly eventName: "StudentIdChanged";
	readonly id: MemberId;
	readonly email: UniversityEmail;
	readonly previousStudentId: StudentId;
	readonly newStudentId: StudentId;
};

/** 名前変更 */
export type NameChanged = DomainEvent & {
	readonly eventName: "NameChanged";
	readonly id: MemberId;
	readonly email: UniversityEmail;
	readonly previousName: string;
	readonly newName: string;
};

/** 個人メールアドレス変更 */
export type PersonalEmailChanged = DomainEvent & {
	readonly eventName: "PersonalEmailChanged";
	readonly id: MemberId;
	readonly email: UniversityEmail;
	readonly previousPersonalEmail: Recorded<Email>;
	readonly newPersonalEmail: Recorded<Email>;
};

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

/** Memberイベント名の選択肢一覧 */
export const MEMBER_EVENT_NAMES = [
	"MemberRegistered",
	"MemberRemoved",
	"MemberReregistered",
	"MemberUnconfirmed",
	"MemberConfirmed",
	"InternallyAdvanced",
	"FacultyTransferred",
	"DepartmentTransferred",
	"MajorTransferred",
	"StudentIdChanged",
	"NameChanged",
	"PersonalEmailChanged",
] as const satisfies readonly MemberDomainEvent["eventName"][];
