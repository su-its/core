import { ValueObject } from "#domain/base/ValueObject";
import type {
	DoctoralAffiliationValue,
	MasterAffiliationValue,
	ProfessionalAffiliationValue,
	UndergraduateAffiliationValue,
} from "./universityStructure";

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

/** 所属 — 学生が大学組織のどこに在籍しているかを表す */
export type Affiliation =
	| UndergraduateAffiliation // 学部
	| MasterAffiliation // 修士
	| DoctoralAffiliation // 博士
	| ProfessionalAffiliation; // 専門職
