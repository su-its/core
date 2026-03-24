import { ValueObject } from "../../base";
import { InvalidLightningTalkDurationException } from "../../exceptions";

export class LightningTalkDuration extends ValueObject<number> {
	protected validate(): void {
		this.throwIfInvalid(this.value > 0, new InvalidLightningTalkDurationException(this.value));
	}
}
