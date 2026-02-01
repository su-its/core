import { randomUUID } from "node:crypto";
import { Member } from "#domain/aggregates/member/Member";
import { Department } from "#domain/value-objects/Departments";
import { UniversityEmail } from "#domain/value-objects/UniversityEmail";

interface MemberFactoryParams {
	id?: string;
	name?: string;
	studentId?: string;
	department?: string;
	email?: string;
}

export function createMember(params: MemberFactoryParams = {}): Member {
	const id = params.id ?? randomUUID();
	const name = params.name ?? "テスト太郎";
	const studentId = params.studentId ?? "12345678";
	const department = Department.fromString(params.department ?? "CS");
	const email = new UniversityEmail(params.email ?? `test-${id}@shizuoka.ac.jp`);

	return new Member(id, name, studentId, department, email);
}
