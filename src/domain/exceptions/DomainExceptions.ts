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

export class InvalidUniversityEmailException extends DomainException {
	constructor(email: string) {
		super(`無効な大学のメールアドレスです: ${email} (大学ドメインが必要です)`);
		this.name = "InvalidUniversityEmailException";
	}
}

export class InvalidLightningTalkDurationException extends DomainException {
	constructor(duration: number) {
		super(`無効なライトニングトークの長さです: ${duration}分 (正の数値で指定してください)`);
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
		super(`指定されたURLのプロトコルは許可されていません: ${url} (プロトコル: ${protocol})`);
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

export class InvalidStudentIdException extends DomainException {
	constructor(studentId: string) {
		super(`無効な学籍番号です: ${studentId} (8桁数字 または 3桁数字+英大文字1文字+4桁数字)`);
		this.name = "InvalidStudentIdException";
	}
}

export class InvalidWorkDurationException extends DomainException {
	constructor(minutes: number) {
		super(`無効な作業時間です: ${minutes}分 (0以上の整数で指定してください)`);
		this.name = "InvalidWorkDurationException";
	}
}

export class InvalidAffiliationOperationException extends DomainException {
	constructor(
		readonly operation: string,
		readonly currentAffiliationType: string,
		readonly reason: string,
	) {
		super(`${operation}に失敗: 現在の所属=${currentAffiliationType}, 理由=${reason}`);
		this.name = "InvalidAffiliationOperationException";
	}
}
