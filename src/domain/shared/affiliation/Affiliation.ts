import type {
	DoctoralAffiliationValue,
	MasterAffiliationValue,
	PartialDoctoralAffiliationValue,
	PartialMasterAffiliationValue,
	PartialProfessionalAffiliationValue,
	PartialUndergraduateAffiliationValue,
	ProfessionalAffiliationValue,
	UndergraduateAffiliationValue,
} from "./universityStructure";

// ── 完全な所属（全フィールド既知） ──

/** 学部所属（完全） */
export type CompleteUndergraduateAffiliation = {
	readonly type: "undergraduate";
	readonly value: UndergraduateAffiliationValue;
};

/** 修士課程所属（完全） */
export type CompleteMasterAffiliation = {
	readonly type: "master";
	readonly value: MasterAffiliationValue;
};

/** 博士課程所属（完全） */
export type CompleteDoctoralAffiliation = {
	readonly type: "doctoral";
	readonly value: DoctoralAffiliationValue;
};

/** 専門職学位課程所属（完全） */
export type CompleteProfessionalAffiliation = {
	readonly type: "professional";
	readonly value: ProfessionalAffiliationValue;
};

/** 完全な所属 — 全フィールドが既知 */
export type CompleteAffiliation =
	| CompleteUndergraduateAffiliation
	| CompleteMasterAffiliation
	| CompleteDoctoralAffiliation
	| CompleteProfessionalAffiliation;

// ── 部分的な所属（下位フィールドが欠損しうる） ──

/** 部分的な学部所属 */
export type PartialUndergraduateAffiliation = {
	readonly type: "undergraduate";
	readonly value: PartialUndergraduateAffiliationValue;
};

/** 部分的な修士課程所属 */
export type PartialMasterAffiliation = {
	readonly type: "master";
	readonly value: PartialMasterAffiliationValue;
};

/** 部分的な博士課程所属 */
export type PartialDoctoralAffiliation = {
	readonly type: "doctoral";
	readonly value: PartialDoctoralAffiliationValue;
};

/** 部分的な専門職学位課程所属 */
export type PartialProfessionalAffiliation = {
	readonly type: "professional";
	readonly value: PartialProfessionalAffiliationValue;
};

/** 部分的な所属 — 階層の途中までしかわからない */
export type PartialAffiliation =
	| PartialUndergraduateAffiliation
	| PartialMasterAffiliation
	| PartialDoctoralAffiliation
	| PartialProfessionalAffiliation;

// ── 所属（完全・部分の統合型） ──

/** 所属 — 完全な場合も部分的な場合もある */
export type Affiliation = CompleteAffiliation | PartialAffiliation;

/** 所属区分の表示名 */
export const affiliationTypeNames = {
	undergraduate: "学士",
	master: "修士",
	doctoral: "博士",
	professional: "専門職学位",
} as const satisfies Record<Affiliation["type"], string>;
