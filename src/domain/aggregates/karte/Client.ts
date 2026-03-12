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

/** 教職員の相談者 */
type StaffClient = {
	readonly type: "staff";
	/** 氏名 */
	readonly name: string;
	/** 所属 */
	readonly affiliation: Affiliation;
};

/** 相談者 — PC相談室に相談を持ち込んだ人 */
export type Client = StudentClient | StaffClient;
