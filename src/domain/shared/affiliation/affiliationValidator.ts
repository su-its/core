/**
 * Affiliation値オブジェクトのランタイムバリデーション
 *
 * universityStructure.ts の型定義と対になるランタイム検証ロジック。
 * 外部入力（DB、API）から構築する際に、型レベルでは保証できない
 * フィールド組み合わせの妥当性を検証する。
 */
import { InvalidAffiliationException } from "#domain/exceptions";

// ── ヘルパー ──

function fail(detail: string): never {
	throw new InvalidAffiliationException(detail);
}

function assertOneOf(
	value: unknown,
	valid: readonly string[],
	label: string,
): asserts value is string {
	if (typeof value !== "string" || !valid.includes(value)) {
		fail(`無効な${label}です: ${value}`);
	}
}

function assertYearRange(year: unknown, max: number): void {
	if (
		typeof year !== "number" ||
		!Number.isInteger(year) ||
		year < 1 ||
		year > max
	) {
		fail(`無効な年次です: ${year} (1〜${max})`);
	}
}

// ── 学部バリデーションデータ ──

const HUMANITIES_DEPTS: Readonly<Record<string, readonly string[]>> = {
	昼間コース: ["社会学科", "言語文化学科", "法学科", "経済学科"],
	夜間主コース: ["法学科", "経済学科"],
};

const EDUCATION_SUBSPECIALTIES: Readonly<
	Record<string, readonly string[] | null>
> = {
	発達教育学専攻: ["教育実践学専修", "教育心理学専修", "幼児教育専修"],
	初等学習開発学専攻: null,
	養護教育専攻: null,
	特別支援教育専攻: null,
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
};

const INFORMATICS_DEPTS = [
	"情報科学科",
	"行動情報学科",
	"情報社会学科",
] as const;

const SCIENCE_DEPTS = [
	"数学科",
	"物理学科",
	"化学科",
	"生物科学科",
	"地球科学科",
] as const;

const ENGINEERING_COURSES: Readonly<Record<string, readonly string[] | null>> =
	{
		機械工学科: [
			"宇宙・環境コース",
			"知能・材料コース",
			"電気機械システムコース",
		],
		電気電子工学科: [
			"情報エレクトロニクスコース",
			"エネルギー・電子制御コース",
		],
		電子物質科学科: ["電子物理デバイスコース", "材料エネルギー化学コース"],
		化学バイオ工学科: ["環境応用化学コース", "バイオ応用工学コース"],
		数理システム工学科: null,
	};

const AGRICULTURE_COURSES: Readonly<Record<string, readonly string[] | null>> =
	{
		生物資源科学科: ["バイオサイエンスコース", "環境サイエンスコース"],
		応用生命科学科: null,
	};

const GLOBAL_COURSES = [
	"国際地域共生学コース",
	"生命圏循環共生学コース",
	"総合人間科学コース",
] as const;

// ── 修士バリデーションデータ ──

const HUMANITIES_MASTER_COURSES: Readonly<Record<string, readonly string[]>> = {
	臨床人間科学専攻: ["臨床心理学コース", "臨床人間科学コース"],
	比較地域文化専攻: ["歴史・文化論コース", "言語文化論コース"],
	経済専攻: ["国際経営コース", "地域公共政策コース"],
};

const INTEGRATED_MASTER_COURSES: Readonly<Record<string, readonly string[]>> = {
	情報学専攻: ["基盤情報学コース", "領域情報学コース"],
	理学専攻: [
		"数学コース",
		"物理学コース",
		"化学コース",
		"生物科学コース",
		"地球科学コース",
	],
	工学専攻: [
		"機械工学コース",
		"電気電子工学コース",
		"電子物質科学コース",
		"化学バイオ工学コース",
		"数理システム工学コース",
		"事業開発マネジメントコース",
	],
	農学専攻: ["生物資源科学コース", "応用生命科学コース", "環境森林科学コース"],
};

// ── 博士バリデーションデータ ──

const CREATIVE_DOCTORAL_MAJORS = [
	"ナノビジョン工学専攻",
	"光・ナノ物質機能専攻",
	"情報科学専攻",
	"環境・エネルギーシステム専攻",
	"バイオサイエンス専攻",
] as const;

// ── バリデーション関数 ──

export function validateUndergraduateValue(v: unknown): void {
	const val = v as Record<string, unknown>;
	assertYearRange(val.year, 4);

	switch (val.faculty) {
		case "人文社会科学部": {
			assertOneOf(
				val.enrollmentType,
				Object.keys(HUMANITIES_DEPTS),
				"課程区分",
			);
			assertOneOf(
				val.department,
				HUMANITIES_DEPTS[val.enrollmentType as string],
				"学科",
			);
			break;
		}
		case "教育学部": {
			if (val.program !== "学校教育教員養成課程") {
				fail(`無効な課程です: ${val.program}`);
			}
			assertOneOf(val.major, Object.keys(EDUCATION_SUBSPECIALTIES), "専攻");
			const subs = EDUCATION_SUBSPECIALTIES[val.major as string];
			if (subs !== null) {
				assertOneOf(val.subspecialty, subs, "専修");
			}
			break;
		}
		case "情報学部": {
			assertOneOf(val.department, [...INFORMATICS_DEPTS], "学科");
			break;
		}
		case "理学部": {
			if ("department" in val && val.department !== undefined) {
				assertOneOf(val.department, [...SCIENCE_DEPTS], "学科");
			} else if ("course" in val && val.course !== undefined) {
				if (val.course !== "創造理学コース") {
					fail(`無効なコースです: ${val.course}`);
				}
			} else {
				fail("理学部には学科またはコースが必要です");
			}
			break;
		}
		case "工学部": {
			assertOneOf(val.department, Object.keys(ENGINEERING_COURSES), "学科");
			const courses = ENGINEERING_COURSES[val.department as string];
			if (courses !== null) {
				assertOneOf(val.course, courses, "コース");
			}
			break;
		}
		case "農学部": {
			assertOneOf(val.department, Object.keys(AGRICULTURE_COURSES), "学科");
			const courses = AGRICULTURE_COURSES[val.department as string];
			if (courses !== null) {
				assertOneOf(val.course, courses, "コース");
			}
			break;
		}
		case "グローバル共創科学部": {
			if (val.department !== "グローバル共創科学科") {
				fail(`無効な学科です: ${val.department}`);
			}
			assertOneOf(val.course, [...GLOBAL_COURSES], "コース");
			break;
		}
		case "地域創造学環":
			break;
		default:
			fail(`無効な学部です: ${val.faculty}`);
	}
}

export function validateMasterValue(v: unknown): void {
	const val = v as Record<string, unknown>;
	assertYearRange(val.year, 2);

	switch (val.school) {
		case "人文社会科学研究科": {
			assertOneOf(val.major, Object.keys(HUMANITIES_MASTER_COURSES), "専攻");
			assertOneOf(
				val.course,
				HUMANITIES_MASTER_COURSES[val.major as string],
				"コース",
			);
			break;
		}
		case "総合科学技術研究科": {
			assertOneOf(val.major, Object.keys(INTEGRATED_MASTER_COURSES), "専攻");
			assertOneOf(
				val.course,
				INTEGRATED_MASTER_COURSES[val.major as string],
				"コース",
			);
			break;
		}
		case "山岳流域研究院":
			break;
		default:
			fail(`無効な研究科です: ${val.school}`);
	}
}

export function validateDoctoralValue(v: unknown): void {
	const val = v as Record<string, unknown>;
	assertYearRange(val.year, 3);

	switch (val.school) {
		case "創造科学技術大学院": {
			assertOneOf(val.major, [...CREATIVE_DOCTORAL_MAJORS], "専攻");
			break;
		}
		case "教育学研究科": {
			if (val.major !== "共同教科開発学専攻") {
				fail(`無効な専攻です: ${val.major}`);
			}
			break;
		}
		case "光医工学研究科": {
			if (val.major !== "光医工学共同専攻") {
				fail(`無効な専攻です: ${val.major}`);
			}
			break;
		}
		default:
			fail(`無効な研究科です: ${val.school}`);
	}
}

export function validateProfessionalValue(v: unknown): void {
	const val = v as Record<string, unknown>;
	assertYearRange(val.year, 2);

	if (val.school !== "教育学研究科") {
		fail(`無効な研究科です: ${val.school}`);
	}
	if (val.major !== "教育実践高度化専攻") {
		fail(`無効な専攻です: ${val.major}`);
	}
}
