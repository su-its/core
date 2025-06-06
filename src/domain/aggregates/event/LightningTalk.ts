import type { LightningTalkDuration, Url } from "../../value-objects";

export class LightningTalk {
	constructor(
		public readonly exhibitId: string,
		private startTime: Date,
		private durationMinutes: LightningTalkDuration,
		private slideUrl?: Url,
	) {}

	getStartTime(): Date {
		return this.startTime;
	}

	getDurationMinutes(): LightningTalkDuration {
		return this.durationMinutes;
	}

	getSlideUrl(): Url | undefined {
		return this.slideUrl;
	}

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

	toSnapshot() {
		return {
			exhibitId: this.exhibitId,
			startTime: this.startTime,
			durationMinutes: this.durationMinutes,
			slideUrl: this.slideUrl,
		};
	}
}
