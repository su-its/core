export class ApplicationException extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ApplicationException";
	}
}

export class EventNotFoundException extends ApplicationException {
	constructor(message = "イベントが見つかりません") {
		super(message);
		this.name = "EventNotFoundException";
	}
}

export class ExhibitNotFoundException extends ApplicationException {
	constructor(message = "展示が見つかりません") {
		super(message);
		this.name = "ExhibitNotFoundException";
	}
}

export class MemberEmailAlreadyExistsException extends ApplicationException {
	constructor(message = "このメールアドレスは既に登録されています") {
		super(message);
		this.name = "MemberEmailAlreadyExistsException";
	}
}

export class MemberNotFoundException extends ApplicationException {
	constructor(message = "メンバーが見つかりません") {
		super(message);
		this.name = "MemberNotFoundException";
	}
}

export class DiscordAccountNotConnectedException extends ApplicationException {
	constructor(message = "このDiscordアカウントは紐づいていません") {
		super(message);
		this.name = "DiscordAccountNotConnectedException";
	}
}
