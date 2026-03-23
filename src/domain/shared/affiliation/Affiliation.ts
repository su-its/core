import type {
	DoctoralAffiliationValue,
	MasterAffiliationValue,
	ProfessionalAffiliationValue,
	UndergraduateAffiliationValue,
} from "./universityStructure";

/** 学部所属 */
export type UndergraduateAffiliation = {
	readonly type: "undergraduate";
	readonly value: UndergraduateAffiliationValue;
};

/** 修士課程所属 */
export type MasterAffiliation = {
	readonly type: "master";
	readonly value: MasterAffiliationValue;
};

/** 博士課程所属 */
export type DoctoralAffiliation = {
	readonly type: "doctoral";
	readonly value: DoctoralAffiliationValue;
};

/** 専門職学位課程所属 */
export type ProfessionalAffiliation = {
	readonly type: "professional";
	readonly value: ProfessionalAffiliationValue;
};

/** 所属 — 学生が大学組織のどこに在籍しているかを表す */
export type Affiliation =
	| UndergraduateAffiliation
	| MasterAffiliation
	| DoctoralAffiliation
	| ProfessionalAffiliation;

/** 所属区分の表示名 */
export const affiliationTypeNames = {
	undergraduate: "学士",
	master: "修士",
	doctoral: "博士",
	professional: "専門職学位",
} as const satisfies Record<Affiliation["type"], string>;
