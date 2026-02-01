import { InvalidUniversityEmailException } from "#domain/exceptions/index.js";
import { Email } from "./Email.js";

const UNIVERSITY_EMAIL_DOMAIN = "@shizuoka.ac.jp";

export class UniversityEmail extends Email {
	protected validate(): void {
		super.validate();
		this.throwIfInvalid(
			this.value.endsWith(UNIVERSITY_EMAIL_DOMAIN),
			new InvalidUniversityEmailException(this.value),
		);
	}
}
