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
		const message = `メンバーが見つかりません: ${discordAccountId}`;
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
