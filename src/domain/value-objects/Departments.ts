type AllowedDepartment = "CS" | "BI" | "IA" | "GRADUATE" | "ALUMNI" | "OTHERS";

export class Department {
	constructor(private readonly value: AllowedDepartment) {}

	static fromString(value: string): Department {
		return new Department(value as AllowedDepartment);
	}
}
