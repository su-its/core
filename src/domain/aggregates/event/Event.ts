import {
	ExhibitAlreadyExistsException,
	ExhibitHasMemberException,
	ExhibitNotFoundException,
} from "../../exceptions";
import type { LightningTalkDuration, Url } from "../../value-objects";
import type { Exhibit } from "./Exhibit";

export class Event {
	private exhibits: Exhibit[] = [];
	private memberIds: Set<string> = new Set();

	constructor(
		public readonly id: string,
		private name: string,
		// TODO: 期間を指定したい
		private date: Date,
	) {}

	public getName(): string {
		return this.name;
	}

	public getDate(): Date {
		return this.date;
	}

	public getExhibits(): Exhibit[] {
		return this.exhibits;
	}

	public getMemberIds(): string[] {
		return Array.from(this.memberIds);
	}

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
		// NOTE: Exhibitに登録するタイミングでEventのmemberIdsにも登録する必要がある
		for (const memberId of exhibit.getMemberIds()) {
			this.memberIds.add(memberId);
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

	public addMemberId(memberId: string): void {
		this.memberIds.add(memberId);
	}

	public removeMemberId(memberId: string): void {
		for (const exhibit of this.exhibits) {
			if (exhibit.getMemberIds().includes(memberId)) {
				throw new ExhibitHasMemberException();
			}
		}
		this.memberIds.delete(memberId);
	}

	public addExhibitMemberId(exhibitId: string, memberId: string): void {
		this.getExhibitOrThrow(exhibitId).addMemberId(memberId);
		// NOTE: Exhibitに登録するタイミングでEventのmemberIdsにも登録する必要がある
		this.memberIds.add(memberId);
	}

	public removeExhibitMemberId(exhibitId: string, memberId: string): void {}
	toSnapshot() {
		return {
			id: this.id,
			name: this.name,
			date: this.date,
			exhibits: this.exhibits.map((exhibit) => exhibit.toSnapshot()),
			memberIds: Array.from(this.memberIds),
		};
	}
}
