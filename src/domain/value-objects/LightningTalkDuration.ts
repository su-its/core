import { InvalidLightningTalkDurationException } from "#domain/exceptions/index.js";
import { ValueObject } from "./ValueObject.js";

export class LightningTalkDuration extends ValueObject<number> {
	protected validate(): void {
		this.throwIfInvalid(
			this.value > 0,
			new InvalidLightningTalkDurationException(this.value),
		);
	}
}
