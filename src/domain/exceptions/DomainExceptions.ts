export class DomainException extends Error {
	constructor(message: string) {
		super(message);
		this.name = "DomainException";
	}
}

export class InvalidMemberException extends DomainException {
	constructor(message = "無効なメンバーです") {
		super(message);
		this.name = "InvalidMemberException";
	}
}

export class InvalidEmailFormatException extends DomainException {
	constructor(message = "無効なメールアドレスの形式です") {
		super(message);
		this.name = "InvalidEmailFormatException";
	}
}
export class DiscordAccountAlreadyConnectedException extends DomainException {
	constructor(
		message = "同じDiscordアカウントがすでにユーザーに紐づいています",
	) {
		super(message);
		this.name = "DiscordAccountAlreadyConnectedException";
	}
}

export class DiscordAccountNotConnectedException extends DomainException {
	constructor(
		message = "指定されたDiscordアカウントがユーザーに紐づいていません",
	) {
		super(message);
		this.name = "DiscordAccountNotConnectedException";
	}
}

export class InvalidUniversityEmailException extends DomainException {
	constructor(message = "無効な大学のメールアドレスです") {
		super(message);
		this.name = "InvalidUniversityEmailException";
	}
}

export class InvalidDepartmentException extends DomainException {
	constructor(message = "無効な学部識別子です") {
		super(message);
		this.name = "InvalidDepartmentException";
	}
}

export class InvalidLightningTalkDurationException extends DomainException {
	constructor(message = "無効なライトニングトークの長さです") {
		super(message);
		this.name = "InvalidLightningTalkDurationException";
	}
}

export class InvalidUrlException extends DomainException {
	constructor(message = "無効なURLです") {
		super(message);
		this.name = "InvalidUrlException";
	}
}

export class InvalidUrlProtocolException extends DomainException {
	constructor(
		message = "指定されたURLのプロトコルは許可されていません。httpまたはhttpsを使用してください。",
	) {
		super(message);
		this.name = "InvalidUrlProtocolException";
	}
}

export class ExhibitAlreadyExistsException extends DomainException {
	constructor(message = "既に同一の展示が登録されています") {
		super(message);
		this.name = "ExhibitAlreadyExistsException";
	}
}

export class ExhibitNotFoundException extends DomainException {
	constructor(message = "指定された展示が見つかりません") {
		super(message);
		this.name = "ExhibitNotFoundException";
	}
}

export class LightningTalkNotFoundException extends DomainException {
	constructor(message = "指定されたライトニングトークが見つかりません") {
		super(message);
		this.name = "LightningTalkNotFoundException";
	}
}
