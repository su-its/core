import { ValueObject } from "#domain/base/ValueObject";
import { InvalidDepartmentException } from "#domain/exceptions";

type AllowedDepartment = "CS" | "BI" | "IA" | "GRADUATE" | "ALUMNI" | "OTHERS";

export class Department extends ValueObject<AllowedDepartment> {
	static fromString(value: string): Department {
		return new Department(value as AllowedDepartment);
	}

	protected validate(): void {
		const validDepartments: AllowedDepartment[] = [
			"CS",
			"BI",
			"IA",
			"GRADUATE",
			"ALUMNI",
			"OTHERS",
		];
		this.throwIfInvalid(
			validDepartments.includes(this.value),
			new InvalidDepartmentException(this.value),
		);
	}
}
