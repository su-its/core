import {
	ExhibitAlreadyExistsException,
	ExhibitHasMemberException,
	ExhibitNotFoundException,
} from "#domain/exceptions";
import type { MemberId } from "#domain/aggregates/member/MemberId";
import type { EventId } from "./EventId";
import type { Exhibit } from "./Exhibit";
import type { ExhibitId } from "./ExhibitId";
import type { LightningTalkDuration } from "./LightningTalkDuration";
import type { Url } from "./Url";

export class Event {
	private exhibits: Exhibit[] = [];
	private memberIds: Set<MemberId> = new Set();

	constructor(
		public readonly id: EventId,
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

	public getMemberIds(): MemberId[] {
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

	public removeExhibit(exhibitId: ExhibitId): void {
		this.getExhibitOrThrow(exhibitId);
		this.exhibits = this.exhibits.filter((x) => x.id !== exhibitId);
	}

	public changeExhibitName(exhibitId: ExhibitId, newName: string): void {
		this.getExhibitOrThrow(exhibitId).changeName(newName);
	}

	public changeExhibitDescription(
		exhibitId: ExhibitId,
		newDescription: string,
	): void {
		this.getExhibitOrThrow(exhibitId).changeDescription(newDescription);
	}

	public changeExhibitMarkdownContent(
		exhibitId: ExhibitId,
		newMarkdownContent: string,
	): void {
		this.getExhibitOrThrow(exhibitId).changeMarkdownContent(newMarkdownContent);
	}

	public changeExhibitUrl(exhibitId: ExhibitId, newUrl: Url): void {
		this.getExhibitOrThrow(exhibitId).changeUrl(newUrl);
	}

	public changeExhibitLightningTalkStartTime(
		exhibitId: ExhibitId,
		newStartTime: Date,
	): void {
		this.getExhibitOrThrow(exhibitId).changeLightningTalkStartTime(
			newStartTime,
		);
	}

	public changeExhibitLightningTalkDuration(
		exhibitId: ExhibitId,
		newDuration: LightningTalkDuration,
	): void {
		this.getExhibitOrThrow(exhibitId).changeLightningTalkDuration(newDuration);
	}

	public changeExhibitLightningTalkSlideUrl(
		exhibitId: ExhibitId,
		newSlideUrl: Url,
	): void {
		this.getExhibitOrThrow(exhibitId).changeLightningTalkSlideUrl(newSlideUrl);
	}

	private getExhibitOrThrow(exhibitId: ExhibitId): Exhibit {
		const exhibit = this.exhibits.find((x) => x.id === exhibitId);
		if (!exhibit) {
			throw new ExhibitNotFoundException(
				`Exhibit(id=${exhibitId}) が見つかりません`,
			);
		}
		return exhibit;
	}

	public addMemberId(memberId: MemberId): void {
		this.memberIds.add(memberId);
	}

	public removeMemberId(memberId: MemberId): void {
		for (const exhibit of this.exhibits) {
			if (exhibit.hasMemberId(memberId)) {
				throw new ExhibitHasMemberException(exhibit.id, memberId);
			}
		}
		this.memberIds.delete(memberId);
	}

	public addExhibitMemberId(exhibitId: ExhibitId, memberId: MemberId): void {
		this.getExhibitOrThrow(exhibitId).addMemberId(memberId);
		// NOTE: Exhibitに登録するタイミングでEventのmemberIdsにも登録する必要がある
		this.memberIds.add(memberId);
	}

	// NOTE: 展示からの削除のみ行い、Event.memberIdsは操作しない。
	// 「展示に所属していないがイベント参加者」という状態が有効なため、
	// イベント参加者からの削除はremoveMemberId()で明示的に行う。
	public removeExhibitMemberId(exhibitId: ExhibitId, memberId: MemberId): void {
		this.getExhibitOrThrow(exhibitId).removeMemberId(memberId);
	}
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
