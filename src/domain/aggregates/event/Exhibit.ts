import {
	LightningTalkExhibitIdMismatchException,
	LightningTalkNotFoundException,
} from "../../exceptions";
import type { LightningTalkDuration, Url } from "../../value-objects";
import type { LightningTalk } from "./LightningTalk";
export class Exhibit {
	private lightningTalk?: LightningTalk;
	private memberIds: Set<string> = new Set();

	// NOTE: LightningTalkのExhibitコンストラクタ(TypeScriptは2つのコンストラクタを持てないため)
	static createWithLightningTalk(
		id: string,
		name: string,
		lt: LightningTalk,
		description?: string,
		markdownContent?: string,
		url?: Url,
	) {
		const exhibit = new Exhibit(id, name, description, markdownContent, url);
		// NOTE: ここで例外を投げるのは、Exhibit の id と LightningTalk の exhibitId が一致しているかどうかをチェックしているため
		if (lt.exhibitId !== id) {
			throw new LightningTalkExhibitIdMismatchException(id, lt.exhibitId);
		}
		exhibit.lightningTalk = lt;
		return exhibit;
	}

	constructor(
		public readonly id: string,
		private name: string,
		private description?: string,
		private markdownContent?: string,
		private url?: Url,
	) {}

	getName(): string {
		return this.name;
	}

	getDescription(): string | undefined {
		return this.description;
	}

	getMarkdownContent(): string | undefined {
		return this.markdownContent;
	}

	getUrl(): Url | undefined {
		return this.url;
	}

	getLightningTalk(): LightningTalk | undefined {
		return this.lightningTalk;
	}

	getMemberIds(): string[] {
		return Array.from(this.memberIds);
	}

	changeName(newName: string): void {
		this.name = newName;
	}

	changeDescription(newDescription: string): void {
		this.description = newDescription;
	}

	changeMarkdownContent(newMarkdownContent: string): void {
		this.markdownContent = newMarkdownContent;
	}

	changeUrl(newUrl: Url): void {
		this.url = newUrl;
	}

	public changeLightningTalkStartTime(newStartTime: Date): void {
		this.getLightningTalkOrThrow().changeStartTime(newStartTime);
	}

	public changeLightningTalkDuration(newDuration: LightningTalkDuration): void {
		this.getLightningTalkOrThrow().changeDuration(newDuration);
	}

	public changeLightningTalkSlideUrl(newSlideUrl: Url): void {
		this.getLightningTalkOrThrow().changeSlideUrl(newSlideUrl);
	}

	public addMemberId(memberId: string): void {
		this.memberIds.add(memberId);
	}

	public removeMemberId(memberId: string): void {
		this.memberIds.delete(memberId);
	}

	private getLightningTalkOrThrow(): LightningTalk {
		if (!this.lightningTalk) {
			throw new LightningTalkNotFoundException(
				`Exhibit(id=${this.id}) に紐づく LightningTalk が存在しません`,
			);
		}
		return this.lightningTalk;
	}

	toSnapshot() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			markdownContent: this.markdownContent,
			url: this.url,
			lightningTalk: this.lightningTalk?.toSnapshot(),
		};
	}
}
