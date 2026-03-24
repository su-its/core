import { InvalidWorkDurationException } from "../../exceptions";

/** 作業時間（分） — 0以上の整数であることを保証する */
export type WorkDuration = number & { readonly __brand: unique symbol };

/** 作業時間を生成する — 0以上の整数でなければ例外 */
export function workDuration(minutes: number): WorkDuration {
	if (!Number.isInteger(minutes) || minutes < 0) {
		throw new InvalidWorkDurationException(minutes);
	}
	return minutes as WorkDuration;
}
