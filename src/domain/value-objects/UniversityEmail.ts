import { InvalidUniversityEmailException } from "../exceptions/DomainExceptions";
import { Email } from "./Email";

const UNIVERSITY_EMAIL_DOMAIN = "@shizuoka.ac.jp";

export class UniversityEmail extends Email {
	constructor(value: string) {
		super(value);
		if (!value.endsWith(UNIVERSITY_EMAIL_DOMAIN)) {
			throw new InvalidUniversityEmailException();
		}
	}
}
