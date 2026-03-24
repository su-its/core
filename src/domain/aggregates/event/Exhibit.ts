import type { MemberId } from "#domain";
import {
	LightningTalkExhibitIdMismatchException,
	LightningTalkNotFoundException,
} from "../../exceptions";
import type { ExhibitId } from "./ExhibitId";
import type { LightningTalk } from "./LightningTalk";
import type { LightningTalkDuration } from "./LightningTalkDuration";
import type { Url } from "./Url";
export class Exhibit {
	private lightningTalk?: LightningTalk;
	private memberIds: Set<MemberId> = new Set();

	// NOTE: LightningTalkのExhibitコンストラクタ(TypeScriptは2つのコンストラクタを持てないため)
	static createWithLightningTalk(
		id: ExhibitId,
		name: string,
		lt: LightningTalk,
		description?: string,
		markdownContent?: string,
		url?: Url,
	) {
		const exhibit = new Exhibit(id, name, description, markdownContent, url);
		if (lt.exhibitId !== id) {
			throw new LightningTalkExhibitIdMismatchException(id, lt.exhibitId);
		}
		exhibit.lightningTalk = lt;
		return exhibit;
	}

	constructor(
		public readonly id: ExhibitId,
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

	getMemberIds(): MemberId[] {
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

	public addMemberId(memberId: MemberId): void {
		this.memberIds.add(memberId);
	}

	public removeMemberId(memberId: MemberId): void {
		this.memberIds.delete(memberId);
	}

	public hasMemberId(memberId: MemberId): boolean {
		return this.memberIds.has(memberId);
	}

	private getLightningTalkOrThrow(): LightningTalk {
		if (!this.lightningTalk) {
			throw new LightningTalkNotFoundException(this.id);
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
			memberIds: Array.from(this.memberIds),
		};
	}
}
