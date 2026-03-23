export class ApplicationException extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ApplicationException";
	}
}

export class EventNotFoundException extends ApplicationException {
	constructor(eventId: string) {
		const message = `イベントが見つかりません: ${eventId}`;
		super(message);
		this.name = "EventNotFoundException";
	}
}

export class ExhibitNotFoundException extends ApplicationException {
	constructor(exhibitId: string) {
		const message = `展示が見つかりません: ${exhibitId}`;
		super(message);
		this.name = "ExhibitNotFoundException";
	}
}

export class ExhibitNotFoundFromExhibitIdException extends ApplicationException {
	constructor(exhibitId: string) {
		const message = `指定された展示IDで展示が見つかりません: ${exhibitId}`;
		super(message);
		this.name = "ExhibitNotFoundFromExhibitIdException";
	}
}

export class MemberEmailAlreadyExistsException extends ApplicationException {
	constructor(email: string) {
		const message = `このメールアドレスは既に登録されています: ${email}`;
		super(message);
		this.name = "MemberEmailAlreadyExistsException";
	}
}

export class MemberNotFoundException extends ApplicationException {
	constructor(memberId: string) {
		const message = `メンバーが見つかりません: ${memberId}`;
		super(message);
		this.name = "MemberNotFoundException";
	}
}

export class MemberNotFoundFromDiscordAccountIdException extends ApplicationException {
	constructor(discordAccountId: string) {
		const message = `指定されたDiscordアカウントIDからメンバーが見つかりません: (DiscordアカウントID) ${discordAccountId}`;
		super(message);
		this.name = "MemberNotFoundFromDiscordAccountIdException";
	}
}

export class DiscordAccountNotConnectedException extends ApplicationException {
	constructor(userId: string, discordUserId: string) {
		const message = `ユーザー: ${userId} のDiscordアカウントは紐づいていません: ${discordUserId}`;
		super(message);
		this.name = "DiscordAccountNotConnectedException";
	}
}

export class DiscordAccountNotFoundException extends ApplicationException {
	constructor(discordAccountId: string) {
		super(`Discordアカウントが見つかりません: ${discordAccountId}`);
		this.name = "DiscordAccountNotFoundException";
	}
}

export class DiscordAccountAlreadyLinkedException extends ApplicationException {
	constructor(discordAccountId: string, existingMemberId: string) {
		super(
			`Discordアカウント ${discordAccountId} は既にメンバー ${existingMemberId} に紐付いています`,
		);
		this.name = "DiscordAccountAlreadyLinkedException";
	}
}

export class MemberNotActiveException extends ApplicationException {
	constructor(memberId: string, currentStatus: string) {
		super(`この操作は室員のみ可能です: メンバーID=${memberId}, 現在のステータス=${currentStatus}`);
		this.name = "MemberNotActiveException";
	}
}
