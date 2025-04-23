import { InvalidUniversityEmailException } from "../exceptions/DomainExceptions";
import { Email } from "./Email";

const UNIVERSITY_EMAIL_DOMAIN = "@shizuoka.ac.jp";

export class UniversityEmail extends Email {
	protected validate(): void {
		super.validate();
		this.throwIfInvalid(
			this.value.endsWith(UNIVERSITY_EMAIL_DOMAIN),
			new InvalidUniversityEmailException(),
		);
	}
}
