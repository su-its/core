import { InvalidEmailFormatException } from "../exceptions";
import { ValueObject } from "./ValueObject";

export class Email extends ValueObject<string> {
	protected validate(): void {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		this.throwIfInvalid(
			emailRegex.test(this.value),
			new InvalidEmailFormatException(this.value),
		);
	}
}
