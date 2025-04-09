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

export class DiscordAccountAlreadyConnectedException extends DomainException {
	constructor(message = "同じDiscordアカウントがすでにユーザーに紐づいています") {
		super(message);
		this.name = "DiscordAccountAlreadyConnectedException";
	}
}

export class DiscordAccountNotConnectedException extends DomainException {
	constructor(message = "指定されたDiscordアカウントがユーザーに紐づいていません") {
		super(message);
		this.name = "DiscordAccountNotConnectedException";
	}
}