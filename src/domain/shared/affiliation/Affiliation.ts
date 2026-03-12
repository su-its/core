import { ValueObject } from "#domain/base/ValueObject";
import {
	validateDoctoralValue,
	validateMasterValue,
	validateProfessionalValue,
	validateUndergraduateValue,
} from "./affiliationValidator";
import type {
	DoctoralAffiliationValue,
	MasterAffiliationValue,
	ProfessionalAffiliationValue,
	UndergraduateAffiliationValue,
} from "./universityStructure";

export class UndergraduateAffiliation extends ValueObject<UndergraduateAffiliationValue> {
	protected validate(): void {
		validateUndergraduateValue(this.value);
	}
}

export class MasterAffiliation extends ValueObject<MasterAffiliationValue> {
	protected validate(): void {
		validateMasterValue(this.value);
	}
}

export class DoctoralAffiliation extends ValueObject<DoctoralAffiliationValue> {
	protected validate(): void {
		validateDoctoralValue(this.value);
	}
}

export class ProfessionalAffiliation extends ValueObject<ProfessionalAffiliationValue> {
	protected validate(): void {
		validateProfessionalValue(this.value);
	}
}

export type Affiliation =
	| UndergraduateAffiliation
	| MasterAffiliation
	| DoctoralAffiliation
	| ProfessionalAffiliation;
