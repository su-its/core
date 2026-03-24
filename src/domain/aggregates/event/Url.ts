import { ValueObject } from "../../base";
import { InvalidUrlException, InvalidUrlProtocolException } from "../../exceptions";

export class Url extends ValueObject<string> {
	protected validate(): void {
		let parsed: URL;
		try {
			parsed = new URL(this.value);
		} catch {
			this.throwIfInvalid(false, new InvalidUrlException(this.value));
			return;
		}

		this.throwIfInvalid(
			["http:", "https:"].includes(parsed.protocol),
			new InvalidUrlProtocolException(this.value, parsed.protocol),
		);
	}
}
