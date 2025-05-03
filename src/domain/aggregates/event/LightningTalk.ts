import type { LightningTalkDuration, Url } from "../../value-objects";

export class LightningTalk {
	constructor(
		public readonly exhibitId: string,
		private startTime: Date,
		private durationMinutes: LightningTalkDuration,
		private slideUrl?: Url,
	) {}

	changeSlideUrl(newSlideUrl: Url): void {
		this.slideUrl = newSlideUrl;
	}

	changeDuration(newDuration: LightningTalkDuration): void {
		this.durationMinutes = newDuration;
	}

	// TODO: イベントの期間内かどうかをチェックする必要がある？
	changeStartTime(newStartTime: Date): void {
		this.startTime = newStartTime;
	}
}
