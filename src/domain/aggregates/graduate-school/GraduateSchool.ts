import {
	MajorAlreadyExistsException,
	MajorNotFoundException,
} from "#domain/exceptions";

/** 研究科の課程 */
export type CourseType = "master" | "doctoral" | "professional";

/**
 * 専攻 — 研究科の下位組織
 *
 * 識別子: 名前
 * 特定の研究科に従属する。
 */
export class Major {
	constructor(
		readonly name: string,
		readonly schoolName: string,
	) {}
}

/**
 * 研究科集約 — 大学院生が所属する組織
 *
 * 識別子: 名前
 * 修士用と博士用は別々に管理される。
 * 専攻を子エンティティとして管理する。
 */
export class GraduateSchool {
	private constructor(
		readonly name: string,
		readonly courseType: CourseType,
		private readonly majors: readonly Major[],
	) {}

	static create(name: string, courseType: CourseType): GraduateSchool {
		return new GraduateSchool(name, courseType, []);
	}

	static reconstruct(
		name: string,
		courseType: CourseType,
		majors: Major[],
	): GraduateSchool {
		return new GraduateSchool(name, courseType, majors);
	}

	getMajors(): readonly Major[] {
		return [...this.majors];
	}

	hasMajor(majorName: string): boolean {
		return this.majors.some((m) => m.name === majorName);
	}

	addMajor(majorName: string): GraduateSchool {
		if (this.hasMajor(majorName)) {
			throw new MajorAlreadyExistsException(majorName, this.name);
		}
		return new GraduateSchool(this.name, this.courseType, [
			...this.majors,
			new Major(majorName, this.name),
		]);
	}

	removeMajor(majorName: string): GraduateSchool {
		if (!this.hasMajor(majorName)) {
			throw new MajorNotFoundException(majorName, this.name);
		}
		return new GraduateSchool(
			this.name,
			this.courseType,
			this.majors.filter((m) => m.name !== majorName),
		);
	}
}
