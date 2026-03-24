import type { Affiliation } from "#domain/shared";
import type { StudentId } from "#domain/shared";

/** 学生の相談者 */
type StudentClient = {
	readonly type: "student";
	/** 学籍番号 */
	readonly studentId: StudentId;
	/** 氏名 */
	readonly name: string;
	/** 所属 */
	readonly affiliation: Affiliation;
};

/** 教員の相談者 */
type TeacherClient = {
	readonly type: "teacher";
	/** 氏名 */
	readonly name: string;
};

/** 職員の相談者 */
type StaffClient = {
	readonly type: "staff";
	/** 氏名 */
	readonly name: string;
};

/** その他の相談者（学外者など） */
type OtherClient = {
	readonly type: "other";
	/** 氏名 */
	readonly name: string;
};

/** 相談者 — PC相談室に相談を持ち込んだ人 */
export type Client = StudentClient | TeacherClient | StaffClient | OtherClient;

/** 相談者種別の表示名 */
export const clientTypeNames = {
	student: "学生",
	teacher: "教員",
	staff: "職員",
	other: "その他",
} as const satisfies Record<Client["type"], string>;

/** 相談者種別 */
export type ClientType = keyof typeof clientTypeNames;

/** 相談者種別の選択肢一覧 */
export const CLIENT_TYPES = Object.keys(clientTypeNames) as ClientType[];
