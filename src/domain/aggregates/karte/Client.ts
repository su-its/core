import type { Affiliation } from "#domain/shared";
import type { StudentId } from "#domain/shared";

type StudentClient = {
	readonly type: "student";
	readonly studentId: StudentId;
	readonly name: string;
	readonly affiliation: Affiliation;
};

type StaffClient = {
	readonly type: "staff";
	readonly name: string;
	readonly affiliation: Affiliation;
};

export type Client = StudentClient | StaffClient;
