import { ValueObject } from "#domain/base/ValueObject";
import type {
	DoctoralAffiliationValue,
	MasterAffiliationValue,
	ProfessionalAffiliationValue,
	UndergraduateAffiliationValue,
} from "./universityStructure";

export class UndergraduateAffiliation extends ValueObject<UndergraduateAffiliationValue> {
	protected validate(): void {}
}

export class MasterAffiliation extends ValueObject<MasterAffiliationValue> {
	protected validate(): void {}
}

export class DoctoralAffiliation extends ValueObject<DoctoralAffiliationValue> {
	protected validate(): void {}
}

export class ProfessionalAffiliation extends ValueObject<ProfessionalAffiliationValue> {
	protected validate(): void {}
}

export type Affiliation =
	| UndergraduateAffiliation
	| MasterAffiliation
	| DoctoralAffiliation
	| ProfessionalAffiliation;
