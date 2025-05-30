import {
	InvalidUrlException,
	InvalidUrlProtocolException,
} from "../exceptions";
import { ValueObject } from "./ValueObject";

export class Url extends ValueObject<string> {
	protected validate(): void {
		let parsed: URL;
		try {
			parsed = new URL(this.value);
		} catch {
			this.throwIfInvalid(
				false,
				new InvalidUrlException(`無効な URL 形式です: ${this.value}`),
			);
			return;
		}

		this.throwIfInvalid(
			["http:", "https:"].includes(parsed.protocol),
			new InvalidUrlProtocolException(),
		);
	}
}
