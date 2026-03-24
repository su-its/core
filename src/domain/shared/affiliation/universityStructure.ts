/**
 * 静岡大学の組織構造定義
 *
 * ランタイムデータを単一の情報源とし、型を導出する。
 *
 * フィールドとユビキタス言語の対応:
 * - `faculty` — 学部（学部課程の組織単位）
 * - `school` — 研究科・大学院（大学院課程の組織単位）
 * - `department` — 学科
 * - `program` — 課程（例: 学校教育教員養成課程）
 * - `major` — 専攻
 * - `course` — コース（専門分野の細分化）
 * - `subspecialty` — 専修（コースよりさらに細分化された専門領域）
 * - `enrollmentType` — 入学区分（昼間コース / 夜間主コース）
 * - `year` — 在学年次
 *
 * @see https://www.shizuoka.ac.jp/subject/
 */

// ============================================================================
// 年次
// ============================================================================

export type UndergraduateYear = 1 | 2 | 3 | 4;
export type MasterYear = 1 | 2;
export type DoctoralYear = 1 | 2 | 3;
export type ProfessionalYear = 1 | 2;

// ============================================================================
// ユーティリティ
// ============================================================================

/** Object.keys の型安全版 */
function keysOf<T extends Record<string, unknown>>(obj: T): (keyof T & string)[] {
	return Object.keys(obj) as (keyof T & string)[];
}

// ============================================================================
// 学部（Undergraduate）— ランタイムデータ
// ============================================================================

/** @see https://www.hss.shizuoka.ac.jp/ */
const humanitiesDepts = {
	day: ["社会学科", "言語文化学科", "法学科", "経済学科"],
	night: ["法学科", "経済学科"],
} as const;

/** @see https://www.ed.shizuoka.ac.jp/applicants/about/organization/ */
const educationMajors = {
	発達教育学専攻: ["教育実践学専修", "教育心理学専修", "幼児教育専修"],
	初等学習開発学専攻: [],
	養護教育専攻: [],
	特別支援教育専攻: [],
	教科教育学専攻: [
		"国語教育専修",
		"社会科教育専修",
		"数学教育専修",
		"理科教育専修",
		"音楽教育専修",
		"美術教育専修",
		"保健体育教育専修",
		"技術教育専修",
		"家庭科教育専修",
		"英語教育専修",
	],
} as const;

/** @see https://www.inf.shizuoka.ac.jp/ */
const informaticsDepts = ["情報科学科", "行動情報学科", "情報社会学科"] as const;

/** @see https://www.sci.shizuoka.ac.jp/dep_study */
const scienceDepts = ["数学科", "物理学科", "化学科", "生物科学科", "地球科学科"] as const;
const scienceCourses = ["創造理学コース"] as const;

/** @see https://www.eng.shizuoka.ac.jp/department/ */
const engineeringDeptCourses = {
	機械工学科: ["宇宙・環境コース", "知能・材料コース", "電気機械システムコース"],
	電気電子工学科: ["情報エレクトロニクスコース", "エネルギー・電子制御コース"],
	電子物質科学科: ["電子物理デバイスコース", "材料エネルギー化学コース"],
	化学バイオ工学科: ["環境応用化学コース", "バイオ応用工学コース"],
	数理システム工学科: [],
} as const;

/** @see https://www.agr.shizuoka.ac.jp/ */
const agricultureDeptCourses = {
	生物資源科学科: ["バイオサイエンスコース", "環境サイエンスコース"],
	応用生命科学科: [],
} as const;

/** @see https://www.gkk.shizuoka.ac.jp/outline/courses/ */
const globalCoCreationCourses = [
	"国際地域共生学コース",
	"生命圏循環共生学コース",
	"総合人間科学コース",
] as const;

// ============================================================================
// 修士課程（Master）— ランタイムデータ
// ============================================================================

/** @see https://www.hss.shizuoka.ac.jp/ghss/ */
const humanitiesMasterMajorCourses = {
	臨床人間科学専攻: ["臨床心理学コース", "臨床人間科学コース"],
	比較地域文化専攻: ["歴史・文化論コース", "言語文化論コース"],
	経済専攻: ["国際経営コース", "地域公共政策コース"],
} as const;

/** @see https://www.shizuoka.ac.jp/subject/graduate/stg/ */
const integratedSciTechMajorCourses = {
	情報学専攻: ["基盤情報学コース", "領域情報学コース"],
	理学専攻: ["数学コース", "物理学コース", "化学コース", "生物科学コース", "地球科学コース"],
	工学専攻: [
		"機械工学コース",
		"電気電子工学コース",
		"電子物質科学コース",
		"化学バイオ工学コース",
		"数理システム工学コース",
		"事業開発マネジメントコース",
	],
	農学専攻: ["生物資源科学コース", "応用生命科学コース", "環境森林科学コース"],
} as const;

// ============================================================================
// 博士課程（Doctoral）— ランタイムデータ
// ============================================================================

/** @see https://gsst.shizuoka.ac.jp/ */
const creativeSciTechMajors = [
	"ナノビジョン工学専攻",
	"光・ナノ物質機能専攻",
	"情報科学専攻",
	"環境・エネルギーシステム専攻",
	"バイオサイエンス専攻",
] as const;

// ============================================================================
// 導出型 — ランタイムデータから自動生成
// ============================================================================

// ── 学部（Undergraduate） ──

/** 人文社会科学部 @see https://www.hss.shizuoka.ac.jp/ */
type HumanitiesFacultyValue =
	| {
			/** 学部 */
			faculty: "人文社会科学部";
			/** 入学区分 */
			enrollmentType: "昼間コース";
			/** 学科 */
			department: (typeof humanitiesDepts.day)[number];
			/** 在学年次 */
			year: UndergraduateYear;
	  }
	| {
			/** 学部 */
			faculty: "人文社会科学部";
			/** 入学区分 */
			enrollmentType: "夜間主コース";
			/** 学科 */
			department: (typeof humanitiesDepts.night)[number];
			/** 在学年次 */
			year: UndergraduateYear;
	  };

type EducationMajorName = keyof typeof educationMajors;
type EducationSubspecialty<M extends EducationMajorName> = (typeof educationMajors)[M][number];

/** 教育学部 @see https://www.ed.shizuoka.ac.jp/applicants/about/organization/ */
type EducationFacultyValue = {
	[M in EducationMajorName]: (typeof educationMajors)[M] extends readonly [string, ...string[]]
		? {
				/** 学部 */
				faculty: "教育学部";
				/** 課程 */
				program: "学校教育教員養成課程";
				/** 専攻 */
				major: M;
				/** 専修 */
				subspecialty: EducationSubspecialty<M>;
				/** 在学年次 */
				year: UndergraduateYear;
			}
		: {
				faculty: "教育学部";
				program: "学校教育教員養成課程";
				major: M;
				year: UndergraduateYear;
			};
}[EducationMajorName];

/** 情報学部 @see https://www.inf.shizuoka.ac.jp/ */
type InformaticsFacultyValue = {
	/** 学部 */
	faculty: "情報学部";
	/** 学科 */
	department: (typeof informaticsDepts)[number];
	/** 在学年次 */
	year: UndergraduateYear;
};

/** 理学部 @see https://www.sci.shizuoka.ac.jp/dep_study */
type ScienceFacultyValue =
	| {
			faculty: "理学部";
			/** 学科 */
			department: (typeof scienceDepts)[number];
			year: UndergraduateYear;
	  }
	| {
			faculty: "理学部";
			/** コース */
			course: (typeof scienceCourses)[number];
			year: UndergraduateYear;
	  };

/** 工学部 @see https://www.eng.shizuoka.ac.jp/department/ */
type EngineeringDept = keyof typeof engineeringDeptCourses;
type EngineeringFacultyValue = {
	[D in EngineeringDept]: (typeof engineeringDeptCourses)[D] extends readonly [string, ...string[]]
		? {
				faculty: "工学部";
				/** 学科 */
				department: D;
				/** コース */
				course: (typeof engineeringDeptCourses)[D][number];
				/** 在学年次 */
				year: UndergraduateYear;
			}
		: { faculty: "工学部"; department: D; year: UndergraduateYear };
}[EngineeringDept];

/** 農学部 @see https://www.agr.shizuoka.ac.jp/ */
type AgricultureDept = keyof typeof agricultureDeptCourses;
type AgricultureFacultyValue = {
	[D in AgricultureDept]: (typeof agricultureDeptCourses)[D] extends readonly [string, ...string[]]
		? {
				faculty: "農学部";
				department: D;
				course: (typeof agricultureDeptCourses)[D][number];
				year: UndergraduateYear;
			}
		: { faculty: "農学部"; department: D; year: UndergraduateYear };
}[AgricultureDept];

/** グローバル共創科学部 @see https://www.gkk.shizuoka.ac.jp/outline/courses/ */
type GlobalCoCreationFacultyValue = {
	faculty: "グローバル共創科学部";
	/** 学科 */
	department: "グローバル共創科学科";
	/** コース */
	course: (typeof globalCoCreationCourses)[number];
	/** 在学年次 */
	year: UndergraduateYear;
};

/** 地域創造学環 @see https://www.srd.shizuoka.ac.jp/ */
type RegionalDevelopmentValue = {
	faculty: "地域創造学環";
	/** 在学年次 */
	year: UndergraduateYear;
};

export type UndergraduateAffiliationValue =
	| HumanitiesFacultyValue // 人文社会科学部
	| EducationFacultyValue // 教育学部
	| InformaticsFacultyValue // 情報学部
	| ScienceFacultyValue // 理学部
	| EngineeringFacultyValue // 工学部
	| AgricultureFacultyValue // 農学部
	| GlobalCoCreationFacultyValue // グローバル共創科学部
	| RegionalDevelopmentValue; // 地域創造学環

// ── 修士課程（Master） ──

/** 人文社会科学研究科 @see https://www.hss.shizuoka.ac.jp/ghss/ */
type HumanitiesMasterMajor = keyof typeof humanitiesMasterMajorCourses;
type HumanitiesMasterValue = {
	[M in HumanitiesMasterMajor]: {
		/** 研究科・大学院 */
		school: "人文社会科学研究科";
		/** 専攻 */
		major: M;
		/** コース */
		course: (typeof humanitiesMasterMajorCourses)[M][number];
		/** 在学年次 */
		year: MasterYear;
	};
}[HumanitiesMasterMajor];

/** 総合科学技術研究科 @see https://www.shizuoka.ac.jp/subject/graduate/stg/ */
type IntegratedSciTechMajor = keyof typeof integratedSciTechMajorCourses;
type IntegratedSciTechMasterValue = {
	[M in IntegratedSciTechMajor]: {
		school: "総合科学技術研究科";
		/** 専攻 */
		major: M;
		/** コース */
		course: (typeof integratedSciTechMajorCourses)[M][number];
		/** 在学年次 */
		year: MasterYear;
	};
}[IntegratedSciTechMajor];

/** 山岳流域研究院 @see https://www.igsmw.shizuoka.ac.jp/ */
type MountainWatershedValue = { school: "山岳流域研究院"; year: MasterYear };

export type MasterAffiliationValue =
	| HumanitiesMasterValue // 人文社会科学研究科
	| IntegratedSciTechMasterValue // 総合科学技術研究科
	| MountainWatershedValue; // 山岳流域研究院

// ── 博士課程（Doctoral） ──

/** 創造科学技術大学院 @see https://gsst.shizuoka.ac.jp/ */
type CreativeSciTechDoctoralValue = {
	school: "創造科学技術大学院";
	/** 専攻 */
	major: (typeof creativeSciTechMajors)[number];
	/** 在学年次 */
	year: DoctoralYear;
};

/** 教育学研究科（博士） @see https://subdev.ed.shizuoka.ac.jp/ */
type EducationDoctoralValue = {
	school: "教育学研究科";
	major: "共同教科開発学専攻";
	year: DoctoralYear;
};

/** 光医工学研究科 @see https://www.cmmp.shizuoka.ac.jp/ */
type OptoBiomedicalDoctoralValue = {
	school: "光医工学研究科";
	major: "光医工学共同専攻";
	year: DoctoralYear;
};

export type DoctoralAffiliationValue =
	| CreativeSciTechDoctoralValue // 創造科学技術大学院
	| EducationDoctoralValue // 教育学研究科
	| OptoBiomedicalDoctoralValue; // 光医工学研究科

// ── 専門職学位課程（Professional） ──

/** 教育学研究科（専門職） @see https://dapse2.ed.shizuoka.ac.jp/ */
export type ProfessionalAffiliationValue = {
	school: "教育学研究科";
	/** 専攻 */
	major: "教育実践高度化専攻";
	/** 在学年次 */
	year: ProfessionalYear;
};

// ============================================================================
// 部分型（年次やフィールドが欠損しうる）
// ============================================================================

type ToPartialFacultyValue<T> = T extends {
	readonly faculty: infer N extends string;
}
	? { readonly faculty: N } & {
			readonly [K in Exclude<keyof T, "faculty">]?: T[K];
		}
	: never;

type ToPartialSchoolValue<T> = T extends {
	readonly school: infer N extends string;
}
	? { readonly school: N } & {
			readonly [K in Exclude<keyof T, "school">]?: T[K];
		}
	: never;

export type PartialUndergraduateAffiliationValue =
	ToPartialFacultyValue<UndergraduateAffiliationValue>;
export type PartialMasterAffiliationValue = ToPartialSchoolValue<MasterAffiliationValue>;
export type PartialDoctoralAffiliationValue = ToPartialSchoolValue<DoctoralAffiliationValue>;
export type PartialProfessionalAffiliationValue =
	ToPartialSchoolValue<ProfessionalAffiliationValue>;

// ============================================================================
// UI用の統合データ
// ============================================================================

type InstitutionEntry = {
	readonly name: string;
	readonly subdivisions: readonly string[];
};

const undergraduateFaculties: readonly InstitutionEntry[] = [
	{ name: "人文社会科学部", subdivisions: [...humanitiesDepts.day] },
	{ name: "教育学部", subdivisions: keysOf(educationMajors) },
	{ name: "情報学部", subdivisions: [...informaticsDepts] },
	{ name: "理学部", subdivisions: [...scienceDepts, ...scienceCourses] },
	{ name: "工学部", subdivisions: keysOf(engineeringDeptCourses) },
	{ name: "農学部", subdivisions: keysOf(agricultureDeptCourses) },
	{ name: "グローバル共創科学部", subdivisions: ["グローバル共創科学科"] },
	{ name: "地域創造学環", subdivisions: [] },
];

const masterSchools: readonly InstitutionEntry[] = [
	{
		name: "人文社会科学研究科",
		subdivisions: keysOf(humanitiesMasterMajorCourses),
	},
	{
		name: "総合科学技術研究科",
		subdivisions: keysOf(integratedSciTechMajorCourses),
	},
	{ name: "山岳流域研究院", subdivisions: [] },
];

const doctoralSchools: readonly InstitutionEntry[] = [
	{ name: "創造科学技術大学院", subdivisions: [...creativeSciTechMajors] },
	{ name: "教育学研究科", subdivisions: ["共同教科開発学専攻"] },
	{ name: "光医工学研究科", subdivisions: ["光医工学共同専攻"] },
];

const professionalSchools: readonly InstitutionEntry[] = [
	{ name: "教育学研究科", subdivisions: ["教育実践高度化専攻"] },
];

export const UNIVERSITY_STRUCTURE = {
	undergraduate: {
		label: "学士課程",
		maxYear: 4,
		institutions: undergraduateFaculties,
	},
	master: { label: "修士課程", maxYear: 2, institutions: masterSchools },
	doctoral: { label: "博士課程", maxYear: 3, institutions: doctoralSchools },
	professional: {
		label: "専門職学位課程",
		maxYear: 2,
		institutions: professionalSchools,
	},
} as const;

/** 課程区分 */
export type CourseType = keyof typeof UNIVERSITY_STRUCTURE;

// ============================================================================
// ヘルパー関数
// ============================================================================

export function getInstitutions(courseType: CourseType): readonly InstitutionEntry[] {
	return UNIVERSITY_STRUCTURE[courseType].institutions;
}

/**
 * 指定した機関の下位区分名を返す。
 * 簡易的なフラットリストのため、入学区分やコースなどの階層は含まない。
 * 正確な階層選択には getAffiliationSteps を使用すること。
 */
export function getSubdivisions(courseType: CourseType, institution: string): readonly string[] {
	return getInstitutions(courseType).find((i) => i.name === institution)?.subdivisions ?? [];
}

export function getMaxYear(courseType: CourseType): number {
	return UNIVERSITY_STRUCTURE[courseType].maxYear;
}

export function getCourseLabel(courseType: CourseType): string {
	return UNIVERSITY_STRUCTURE[courseType].label;
}

// ============================================================================
// 動的ステップ生成 — 学部ごとに異なる所属階層を表現
// ============================================================================

export type AffiliationStep = {
	readonly field: string;
	readonly label: string;
	readonly options: readonly string[];
};

/**
 * 選択済みの値に基づいて、次に必要な選択ステップを返す。
 * 選択肢が1つしかない場合はそのステップも返す（UI側でauto-skip判断する）。
 */
export function getAffiliationSteps(
	courseType: CourseType,
	selections: Readonly<Record<string, string>>,
): AffiliationStep[] {
	switch (courseType) {
		case "undergraduate":
			return getUndergraduateSteps(selections);
		case "master":
			return getMasterSteps(selections);
		case "doctoral":
			return getDoctoralSteps(selections);
		case "professional":
			return getProfessionalSteps(selections);
	}
}

function getUndergraduateSteps(s: Readonly<Record<string, string>>): AffiliationStep[] {
	const steps: AffiliationStep[] = [];
	steps.push({
		field: "faculty",
		label: "学部",
		options: undergraduateFaculties.map((f) => f.name),
	});
	if (!s.faculty) return steps;

	switch (s.faculty) {
		case "人文社会科学部":
			steps.push({
				field: "enrollmentType",
				label: "入学区分",
				options: ["昼間コース", "夜間主コース"],
			});
			if (!s.enrollmentType) return steps;
			steps.push({
				field: "department",
				label: "学科",
				options:
					s.enrollmentType === "夜間主コース"
						? [...humanitiesDepts.night]
						: [...humanitiesDepts.day],
			});
			break;
		case "教育学部":
			steps.push({
				field: "program",
				label: "課程",
				options: ["学校教育教員養成課程"],
			});
			if (!s.program) return steps;
			steps.push({
				field: "major",
				label: "専攻",
				options: keysOf(educationMajors),
			});
			if (!s.major) return steps;
			if (s.major in educationMajors) {
				const subs = educationMajors[s.major as keyof typeof educationMajors];
				if (subs.length > 0) {
					steps.push({
						field: "subspecialty",
						label: "専修",
						options: [...subs],
					});
				}
			}
			break;
		case "情報学部":
			steps.push({
				field: "department",
				label: "学科",
				options: [...informaticsDepts],
			});
			break;
		case "理学部":
			if (!s.course) {
				steps.push({
					field: "department",
					label: "学科",
					options: [...scienceDepts],
				});
			}
			if (!s.department) {
				steps.push({
					field: "course",
					label: "コース",
					options: [...scienceCourses],
				});
			}
			break;
		case "工学部":
			steps.push({
				field: "department",
				label: "学科",
				options: keysOf(engineeringDeptCourses),
			});
			if (!s.department) return steps;
			if (s.department in engineeringDeptCourses) {
				const courses = engineeringDeptCourses[s.department as keyof typeof engineeringDeptCourses];
				if (courses.length > 0) {
					steps.push({
						field: "course",
						label: "コース",
						options: [...courses],
					});
				}
			}
			break;
		case "農学部":
			steps.push({
				field: "department",
				label: "学科",
				options: keysOf(agricultureDeptCourses),
			});
			if (!s.department) return steps;
			if (s.department in agricultureDeptCourses) {
				const courses = agricultureDeptCourses[s.department as keyof typeof agricultureDeptCourses];
				if (courses.length > 0) {
					steps.push({
						field: "course",
						label: "コース",
						options: [...courses],
					});
				}
			}
			break;
		case "グローバル共創科学部":
			steps.push({
				field: "department",
				label: "学科",
				options: ["グローバル共創科学科"],
			});
			if (!s.department) return steps;
			steps.push({
				field: "course",
				label: "コース",
				options: [...globalCoCreationCourses],
			});
			break;
		case "地域創造学環":
			break;
	}
	return steps;
}

function getMasterSteps(s: Readonly<Record<string, string>>): AffiliationStep[] {
	const steps: AffiliationStep[] = [];
	steps.push({
		field: "school",
		label: "研究科",
		options: masterSchools.map((sc) => sc.name),
	});
	if (!s.school) return steps;

	switch (s.school) {
		case "人文社会科学研究科": {
			steps.push({
				field: "major",
				label: "専攻",
				options: keysOf(humanitiesMasterMajorCourses),
			});
			if (!s.major) return steps;
			if (s.major in humanitiesMasterMajorCourses) {
				const courses =
					humanitiesMasterMajorCourses[s.major as keyof typeof humanitiesMasterMajorCourses];
				steps.push({ field: "course", label: "コース", options: [...courses] });
			}
			break;
		}
		case "総合科学技術研究科": {
			steps.push({
				field: "major",
				label: "専攻",
				options: keysOf(integratedSciTechMajorCourses),
			});
			if (!s.major) return steps;
			if (s.major in integratedSciTechMajorCourses) {
				const courses =
					integratedSciTechMajorCourses[s.major as keyof typeof integratedSciTechMajorCourses];
				steps.push({ field: "course", label: "コース", options: [...courses] });
			}
			break;
		}
		case "山岳流域研究院":
			break;
	}
	return steps;
}

function getDoctoralSteps(s: Readonly<Record<string, string>>): AffiliationStep[] {
	const steps: AffiliationStep[] = [];
	steps.push({
		field: "school",
		label: "研究科",
		options: doctoralSchools.map((sc) => sc.name),
	});
	if (!s.school) return steps;

	switch (s.school) {
		case "創造科学技術大学院":
			steps.push({
				field: "major",
				label: "専攻",
				options: [...creativeSciTechMajors],
			});
			break;
		case "教育学研究科":
			steps.push({
				field: "major",
				label: "専攻",
				options: ["共同教科開発学専攻"],
			});
			break;
		case "光医工学研究科":
			steps.push({
				field: "major",
				label: "専攻",
				options: ["光医工学共同専攻"],
			});
			break;
	}
	return steps;
}

function getProfessionalSteps(s: Readonly<Record<string, string>>): AffiliationStep[] {
	const steps: AffiliationStep[] = [];
	steps.push({ field: "school", label: "研究科", options: ["教育学研究科"] });
	if (!s.school) return steps;
	steps.push({
		field: "major",
		label: "専攻",
		options: ["教育実践高度化専攻"],
	});
	return steps;
}
