import { ValueObject } from "#domain/base/ValueObject";
import type {
	PartialDoctoralAffiliationValue,
	PartialMasterAffiliationValue,
	PartialProfessionalAffiliationValue,
	PartialUndergraduateAffiliationValue,
} from "./partialUniversityStructure";
import type {
	DoctoralAffiliationValue,
	MasterAffiliationValue,
	ProfessionalAffiliationValue,
	UndergraduateAffiliationValue,
} from "./universityStructure";

// ── 完全な所属（全フィールド既知） ──

/** 学部所属 */
export class UndergraduateAffiliation extends ValueObject<UndergraduateAffiliationValue> {
	protected validate(): void {}
}

/** 修士課程所属 */
export class MasterAffiliation extends ValueObject<MasterAffiliationValue> {
	protected validate(): void {}
}

/** 博士課程所属 */
export class DoctoralAffiliation extends ValueObject<DoctoralAffiliationValue> {
	protected validate(): void {}
}

/** 専門職学位課程所属 */
export class ProfessionalAffiliation extends ValueObject<ProfessionalAffiliationValue> {
	protected validate(): void {}
}

/** 完全な所属 — 全フィールドが既知 */
export type Affiliation =
	| UndergraduateAffiliation
	| MasterAffiliation
	| DoctoralAffiliation
	| ProfessionalAffiliation;

// ── 部分的な所属（下位フィールドが欠損しうる） ──

/** 部分的な学部所属 */
export class PartialUndergraduateAffiliation extends ValueObject<PartialUndergraduateAffiliationValue> {
	protected validate(): void {}
}

/** 部分的な修士課程所属 */
export class PartialMasterAffiliation extends ValueObject<PartialMasterAffiliationValue> {
	protected validate(): void {}
}

/** 部分的な博士課程所属 */
export class PartialDoctoralAffiliation extends ValueObject<PartialDoctoralAffiliationValue> {
	protected validate(): void {}
}

/** 部分的な専門職学位課程所属 */
export class PartialProfessionalAffiliation extends ValueObject<PartialProfessionalAffiliationValue> {
	protected validate(): void {}
}

/** 部分的な所属 — 階層の途中までしかわからない */
export type PartialAffiliation =
	| PartialUndergraduateAffiliation
	| PartialMasterAffiliation
	| PartialDoctoralAffiliation
	| PartialProfessionalAffiliation;
