export class DomainException extends Error {
	constructor(message: string) {
		super(message);
		this.name = "DomainException";
	}
}

export class InvalidEmailFormatException extends DomainException {
	constructor(email: string) {
		super(`無効なメールアドレスの形式です: ${email}`);
		this.name = "InvalidEmailFormatException";
	}
}
export class DiscordAccountAlreadyConnectedException extends DomainException {
	constructor() {
		super("同じDiscordアカウントがすでにユーザーに紐づいています");
		this.name = "DiscordAccountAlreadyConnectedException";
	}
}

export class DiscordAccountNotConnectedException extends DomainException {
	constructor() {
		super("指定されたDiscordアカウントがユーザーに紐づいていません");
		this.name = "DiscordAccountNotConnectedException";
	}
}

export class InvalidUniversityEmailException extends DomainException {
	constructor(email: string) {
		super(`無効な大学のメールアドレスです: ${email} (大学ドメインが必要です)`);
		this.name = "InvalidUniversityEmailException";
	}
}

export class InvalidDepartmentException extends DomainException {
	constructor(department: string) {
		super(
			`無効な学部識別子です: ${department} (有効値: CS, BI, IA, GRADUATE, ALUMNI, OTHERS)`,
		);
		this.name = "InvalidDepartmentException";
	}
}

export class InvalidLightningTalkDurationException extends DomainException {
	constructor(duration: number) {
		super(
			`無効なライトニングトークの長さです: ${duration}分 (正の数値で指定してください)`,
		);
		this.name = "InvalidLightningTalkDurationException";
	}
}

export class InvalidUrlException extends DomainException {
	constructor(url: string) {
		super(`無効なURLです: ${url}`);
		this.name = "InvalidUrlException";
	}
}

export class InvalidUrlProtocolException extends DomainException {
	constructor(url: string, protocol: string) {
		super(
			`指定されたURLのプロトコルは許可されていません: ${url} (プロトコル: ${protocol})`,
		);
		this.name = "InvalidUrlProtocolException";
	}
}

export class ExhibitAlreadyExistsException extends DomainException {
	constructor(exhibitId: string) {
		super(`既に同一の展示が登録されています: ${exhibitId}`);
		this.name = "ExhibitAlreadyExistsException";
	}
}

export class ExhibitNotFoundException extends DomainException {
	constructor(exhibitId: string) {
		super(`指定された展示が見つかりません: ${exhibitId}`);
		this.name = "ExhibitNotFoundException";
	}
}

export class LightningTalkNotFoundException extends DomainException {
	constructor(lightningTalkId: string) {
		super(`指定されたライトニングトークが見つかりません: ${lightningTalkId}`);
		this.name = "LightningTalkNotFoundException";
	}
}

export class LightningTalkExhibitIdMismatchException extends DomainException {
	constructor(lightningTalkId: string, exhibitId: string) {
		super(
			`指定されたライトニングトークのidが展示のidと一致していません: ライトニングトークID ${lightningTalkId}, 展示ID ${exhibitId}`,
		);
		this.name = "LightningTalkExhibitIdMismatchException";
	}
}

export class ExhibitHasMemberException extends DomainException {
	constructor(exhibitId: string, memberId: string) {
		super(
			`イベントに紐づいた展示に当該メンバーがいるため、Eventから削除できません: 展示ID ${exhibitId}, メンバーID ${memberId}`,
		);
		this.name = "ExhibitHasMemberException";
	}
}
