import {
	ExhibitAlreadyExistsException,
	ExhibitNotFoundException,
} from "../../exceptions";
import type { Exhibit } from "./Exhibit";
import type { LightningTalkDuration, Url } from "../../value-objects";

export class Event {
	private exhibits: Exhibit[] = [];

	constructor(
		public readonly id: string,
		private name: string,
		// TODO: 期間を指定したい
		private date: Date,
	) {}

	public changeName(newName: string): void {
		this.name = newName;
	}

	public changeDate(newDate: Date): void {
		// NOTE: 時間を変更した時に、時間系のプロパティを持つエンティティの時間を変更する必要がある？
		this.date = newDate;
	}

	public addExhibit(exhibit: Exhibit): void {
		if (this.exhibits.some((x) => x.id === exhibit.id)) {
			throw new ExhibitAlreadyExistsException(
				`Exhibit(id=${exhibit.id}) は既に存在します`,
			);
		}
		this.exhibits.push(exhibit);
	}

	public removeExhibit(exhibitId: string): void {
		this.getExhibitOrThrow(exhibitId);
		this.exhibits = this.exhibits.filter((x) => x.id !== exhibitId);
	}

	public changeExhibitName(exhibitId: string, newName: string): void {
		this.getExhibitOrThrow(exhibitId).changeName(newName);
	}

	public changeExhibitDescription(
		exhibitId: string,
		newDescription: string,
	): void {
		this.getExhibitOrThrow(exhibitId).changeDescription(newDescription);
	}

	public changeExhibitMarkdownContent(
		exhibitId: string,
		newMarkdownContent: string,
	): void {
		this.getExhibitOrThrow(exhibitId).changeMarkdownContent(newMarkdownContent);
	}

	public changeExhibitUrl(exhibitId: string, newUrl: Url): void {
		this.getExhibitOrThrow(exhibitId).changeUrl(newUrl);
	}

	public changeExhibitLightningTalkStartTime(
		exhibitId: string,
		newStartTime: Date,
	): void {
		this.getExhibitOrThrow(exhibitId).changeLightningTalkStartTime(
			newStartTime,
		);
	}

	public changeExhibitLightningTalkDuration(
		exhibitId: string,
		newDuration: LightningTalkDuration,
	): void {
		this.getExhibitOrThrow(exhibitId).changeLightningTalkDuration(newDuration);
	}

	public changeExhibitLightningTalkSlideUrl(
		exhibitId: string,
		newSlideUrl: Url,
	): void {
		this.getExhibitOrThrow(exhibitId).changeLightningTalkSlideUrl(newSlideUrl);
	}

	private getExhibitOrThrow(exhibitId: string): Exhibit {
		const exhibit = this.exhibits.find((x) => x.id === exhibitId);
		if (!exhibit) {
			throw new ExhibitNotFoundException(
				`Exhibit(id=${exhibitId}) が見つかりません`,
			);
		}
		return exhibit;
	}

	toSnapshot() {
		return {
			id: this.id,
			name: this.name,
			date: this.date,
			exhibits: this.exhibits.map((exhibit) => exhibit.toSnapshot()),
		};
	}
}
