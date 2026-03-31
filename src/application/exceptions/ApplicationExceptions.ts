/**
 * アプリケーション例外のカテゴリ。
 */
export type ApplicationExceptionCategory = "NOT_FOUND" | "CONFLICT" | "PRECONDITION_FAILED";

/**
 * 全アプリケーション例外の基底クラス。
 * code, category, context, hint を持ち、プログラムから構造的にエラー情報を取得できる。
 */
export abstract class ApplicationException extends Error {
	abstract readonly code: string;
	abstract readonly category: ApplicationExceptionCategory;
	abstract readonly context: Record<string, unknown>;
	abstract readonly hint: string;

	constructor(message: string, options?: { cause?: unknown }) {
		super(message, options);
		this.name = this.constructor.name;
	}
}

// ---------------------------------------------------------------------------
// NOT_FOUND — リソースが見つからない
// ---------------------------------------------------------------------------

export class EventNotFoundException extends ApplicationException {
	readonly code = "EVENT_NOT_FOUND";
	readonly category = "NOT_FOUND";
	readonly context: { eventId: string };
	readonly hint = "イベントIDが正しいか、または削除されていないか確認してください";

	constructor(eventId: string, options?: { cause?: unknown }) {
		super(`イベントが見つかりません: ${eventId}`, options);
		this.context = { eventId };
	}
}

export class EventNotFoundByExhibitIdException extends ApplicationException {
	readonly code = "EVENT_NOT_FOUND_BY_EXHIBIT_ID";
	readonly category = "NOT_FOUND";
	readonly context: { exhibitId: string };
	readonly hint = "展示IDが正しいか、または展示がイベントに紐付いているか確認してください";

	constructor(exhibitId: string, options?: { cause?: unknown }) {
		super(`指定された展示IDに紐付くイベントが見つかりません: ${exhibitId}`, options);
		this.context = { exhibitId };
	}
}

export class ExhibitNotFoundException extends ApplicationException {
	readonly code = "EXHIBIT_NOT_FOUND";
	readonly category = "NOT_FOUND";
	readonly context: { exhibitId: string };
	readonly hint = "展示IDが正しいか確認してください";

	constructor(exhibitId: string, options?: { cause?: unknown }) {
		super(`展示が見つかりません: ${exhibitId}`, options);
		this.context = { exhibitId };
	}
}

export class ExhibitNotFoundFromExhibitIdException extends ApplicationException {
	readonly code = "EXHIBIT_NOT_FOUND_BY_EXHIBIT_ID";
	readonly category = "NOT_FOUND";
	readonly context: { exhibitId: string };
	readonly hint = "展示IDが正しいか、またはイベントに登録済みか確認してください";

	constructor(exhibitId: string, options?: { cause?: unknown }) {
		super(`指定された展示IDで展示が見つかりません: ${exhibitId}`, options);
		this.context = { exhibitId };
	}
}

export class MemberNotFoundException extends ApplicationException {
	readonly code = "MEMBER_NOT_FOUND";
	readonly category = "NOT_FOUND";
	readonly context: { memberId: string };
	readonly hint = "メンバーIDが正しいか、または削除されていないか確認してください";

	constructor(memberId: string, options?: { cause?: unknown }) {
		super(`メンバーが見つかりません: ${memberId}`, options);
		this.context = { memberId };
	}
}

export class MemberNotFoundFromDiscordAccountIdException extends ApplicationException {
	readonly code = "MEMBER_NOT_FOUND_BY_DISCORD_ID";
	readonly category = "NOT_FOUND";
	readonly context: { discordAccountId: string };
	readonly hint = "Discordアカウントがメンバーに紐付けられているか確認してください";

	constructor(discordAccountId: string, options?: { cause?: unknown }) {
		super(`DiscordアカウントIDからメンバーが見つかりません: ${discordAccountId}`, options);
		this.context = { discordAccountId };
	}
}

export class KarteNotFoundException extends ApplicationException {
	readonly code = "KARTE_NOT_FOUND";
	readonly category = "NOT_FOUND";
	readonly context: { karteId: string };
	readonly hint = "カルテIDが正しいか確認してください";

	constructor(karteId: string, options?: { cause?: unknown }) {
		super(`カルテが見つかりません: ${karteId}`, options);
		this.context = { karteId };
	}
}

export class DiscordAccountNotFoundException extends ApplicationException {
	readonly code = "DISCORD_ACCOUNT_NOT_FOUND";
	readonly category = "NOT_FOUND";
	readonly context: { discordAccountId: string };
	readonly hint = "DiscordアカウントIDが正しいか確認してください";

	constructor(discordAccountId: string, options?: { cause?: unknown }) {
		super(`Discordアカウントが見つかりません: ${discordAccountId}`, options);
		this.context = { discordAccountId };
	}
}

// ---------------------------------------------------------------------------
// CONFLICT — 重複・既存リンク
// ---------------------------------------------------------------------------

export class MemberEmailAlreadyExistsException extends ApplicationException {
	readonly code = "MEMBER_EMAIL_ALREADY_EXISTS";
	readonly category = "CONFLICT";
	readonly context: { email: string };
	readonly hint = "別のメールアドレスを使用するか、既存アカウントを確認してください";

	constructor(email: string, options?: { cause?: unknown }) {
		super(`このメールアドレスは既に登録されています: ${email}`, options);
		this.context = { email };
	}
}

export class DiscordAccountAlreadyLinkedException extends ApplicationException {
	readonly code = "DISCORD_ACCOUNT_ALREADY_LINKED";
	readonly category = "CONFLICT";
	readonly context: { discordAccountId: string; existingMemberId: string };
	readonly hint =
		"このDiscordアカウントは別のメンバーに紐付いています。先に既存の紐付けを解除してください";

	constructor(discordAccountId: string, existingMemberId: string, options?: { cause?: unknown }) {
		super(
			`Discordアカウント ${discordAccountId} は既にメンバー ${existingMemberId} に紐付いています`,
			options,
		);
		this.context = { discordAccountId, existingMemberId };
	}
}

export class DiscordAccountAlreadyLinkedToSameMemberException extends ApplicationException {
	readonly code = "DISCORD_ACCOUNT_ALREADY_LINKED_TO_SAME_MEMBER";
	readonly category = "CONFLICT";
	readonly context: { discordAccountId: string; memberId: string };
	readonly hint = "このDiscordアカウントは既にこのメンバーに紐付いています。操作は不要です";

	constructor(discordAccountId: string, memberId: string, options?: { cause?: unknown }) {
		super(
			`Discordアカウント ${discordAccountId} は既にこのメンバー ${memberId} に紐付いています`,
			options,
		);
		this.context = { discordAccountId, memberId };
	}
}

// ---------------------------------------------------------------------------
// PRECONDITION_FAILED — 前提条件未達
// ---------------------------------------------------------------------------

export class DiscordAccountNotConnectedException extends ApplicationException {
	readonly code = "DISCORD_ACCOUNT_NOT_CONNECTED";
	readonly category = "PRECONDITION_FAILED";
	readonly context: { userId: string; discordUserId: string };
	readonly hint = "先にDiscordアカウントをメンバーに紐付けてから、この操作を行ってください";

	constructor(userId: string, discordUserId: string, options?: { cause?: unknown }) {
		super(`ユーザー ${userId} のDiscordアカウントは紐づいていません: ${discordUserId}`, options);
		this.context = { userId, discordUserId };
	}
}

export class MemberNotActiveException extends ApplicationException {
	readonly code = "MEMBER_NOT_ACTIVE";
	readonly category = "PRECONDITION_FAILED";
	readonly context: { memberId: string; currentStatus: string };
	readonly hint: string;

	constructor(memberId: string, currentStatus: string, options?: { cause?: unknown }) {
		super(
			`この操作は室員のみ可能です: メンバーID=${memberId}, 現在のステータス=${currentStatus}`,
			options,
		);
		this.context = { memberId, currentStatus };
		this.hint = `メンバーのステータスが「${currentStatus}」のため操作できません。室員ステータスが必要です`;
	}
}
