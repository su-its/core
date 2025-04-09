export class ApplicationException extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ApplicationException";
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
