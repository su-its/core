import { InvalidLightningTalkDurationException } from "#domain/exceptions";
import { ValueObject } from "#domain/base/ValueObject";

export class LightningTalkDuration extends ValueObject<number> {
	protected validate(): void {
		this.throwIfInvalid(
			this.value > 0,
			new InvalidLightningTalkDurationException(this.value),
		);
	}
}
