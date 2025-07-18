import { InvalidLightningTalkDurationException } from "../exceptions";
import { ValueObject } from "./ValueObject";

export class LightningTalkDuration extends ValueObject<number> {
	protected validate(): void {
		this.throwIfInvalid(
			this.value > 0,
			new InvalidLightningTalkDurationException(this.value),
		);
	}
}
