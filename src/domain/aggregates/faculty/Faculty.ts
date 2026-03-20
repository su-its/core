import {
	DepartmentAlreadyExistsException,
	DepartmentNotFoundException,
} from "#domain/exceptions";

/**
 * 学科 — 学部の下位組織
 *
 * 識別子: 名前
 * 特定の学部に従属する。
 */
export class Department {
	constructor(
		readonly name: string,
		readonly facultyName: string,
	) {}
}

/**
 * 学部集約 — 学部生が所属する組織
 *
 * 識別子: 名前
 * 学科を子エンティティとして管理する。
 */
export class Faculty {
	private constructor(
		readonly name: string,
		private readonly departments: readonly Department[],
	) {}

	static create(name: string): Faculty {
		return new Faculty(name, []);
	}

	static reconstruct(name: string, departments: Department[]): Faculty {
		return new Faculty(name, departments);
	}

	getDepartments(): readonly Department[] {
		return [...this.departments];
	}

	hasDepartment(departmentName: string): boolean {
		return this.departments.some((d) => d.name === departmentName);
	}

	addDepartment(departmentName: string): Faculty {
		if (this.hasDepartment(departmentName)) {
			throw new DepartmentAlreadyExistsException(departmentName, this.name);
		}
		return new Faculty(this.name, [
			...this.departments,
			new Department(departmentName, this.name),
		]);
	}

	removeDepartment(departmentName: string): Faculty {
		if (!this.hasDepartment(departmentName)) {
			throw new DepartmentNotFoundException(departmentName, this.name);
		}
		return new Faculty(
			this.name,
			this.departments.filter((d) => d.name !== departmentName),
		);
	}
}
