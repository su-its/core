/**
 * ドメイン例外のカテゴリ。
 * 呼び出し側がエラーの大分類で分岐するために使用する。
 */
export type DomainExceptionCategory =
	| "VALIDATION"
	| "NOT_FOUND"
	| "CONFLICT"
	| "INVARIANT_VIOLATION";

/**
 * 全ドメイン例外の基底クラス。
 * code, category, context, hint を持ち、プログラムから構造的にエラー情報を取得できる。
 */
export abstract class DomainException extends Error {
	abstract readonly code: string;
	abstract readonly category: DomainExceptionCategory;
	abstract readonly context: Record<string, unknown>;
	abstract readonly hint: string;

	constructor(message: string, options?: { cause?: unknown }) {
		super(message, options);
		this.name = this.constructor.name;
	}
}

// ---------------------------------------------------------------------------
// VALIDATION — 入力値・フォーマットの検証エラー
// ---------------------------------------------------------------------------

export class InvalidEmailFormatException extends DomainException {
	readonly code = "INVALID_EMAIL_FORMAT";
	readonly category = "VALIDATION" as const;
	readonly context: { email: string };
	readonly hint = "有効なメールアドレス形式（例: user@example.com）で入力してください";

	constructor(email: string, options?: { cause?: unknown }) {
		super(`無効なメールアドレスの形式です: ${email}`, options);
		this.context = { email };
	}
}

export class InvalidUniversityEmailException extends DomainException {
	readonly code = "INVALID_UNIVERSITY_EMAIL";
	readonly category = "VALIDATION" as const;
	readonly context: { email: string };
	readonly hint = "大学ドメインのメールアドレスを使用してください";

	constructor(email: string, options?: { cause?: unknown }) {
		super(`無効な大学のメールアドレスです: ${email}`, options);
		this.context = { email };
	}
}

export class InvalidLightningTalkDurationException extends DomainException {
	readonly code = "INVALID_LIGHTNING_TALK_DURATION";
	readonly category = "VALIDATION" as const;
	readonly context: { duration: number };
	readonly hint = "正の整数値（分単位）で指定してください";

	constructor(duration: number, options?: { cause?: unknown }) {
		super(`無効なライトニングトークの長さです: ${duration}分`, options);
		this.context = { duration };
	}
}

export class InvalidUrlException extends DomainException {
	readonly code = "INVALID_URL";
	readonly category = "VALIDATION" as const;
	readonly context: { url: string };
	readonly hint = "有効なURL形式（例: https://example.com）で入力してください";

	constructor(url: string, options?: { cause?: unknown }) {
		super(`無効なURLです: ${url}`, options);
		this.context = { url };
	}
}

export class InvalidUrlProtocolException extends DomainException {
	readonly code = "INVALID_URL_PROTOCOL";
	readonly category = "VALIDATION" as const;
	readonly context: { url: string; protocol: string };
	readonly hint = "http または https プロトコルのURLを指定してください";

	constructor(url: string, protocol: string, options?: { cause?: unknown }) {
		super(`許可されていないプロトコルです: ${protocol} (URL: ${url})`, options);
		this.context = { url, protocol };
	}
}

export class InvalidStudentIdException extends DomainException {
	readonly code = "INVALID_STUDENT_ID";
	readonly category = "VALIDATION" as const;
	readonly context: { studentId: string };
	readonly hint =
		"学籍番号は 8桁数字 または 3桁数字+英大文字1文字+4桁数字 の形式で入力してください";

	constructor(studentId: string, options?: { cause?: unknown }) {
		super(`無効な学籍番号です: ${studentId}`, options);
		this.context = { studentId };
	}
}

export class InvalidWorkDurationException extends DomainException {
	readonly code = "INVALID_WORK_DURATION";
	readonly category = "VALIDATION" as const;
	readonly context: { minutes: number };
	readonly hint = "0以上の整数値（分単位）で指定してください";

	constructor(minutes: number, options?: { cause?: unknown }) {
		super(`無効な作業時間です: ${minutes}分`, options);
		this.context = { minutes };
	}
}

export class InvalidConsultedAtException extends DomainException {
	readonly code = "INVALID_CONSULTED_AT";
	readonly category = "VALIDATION" as const;
	readonly context: { reason: string };
	readonly hint = "有効な日時を指定してください";

	constructor(reason: string, options?: { cause?: unknown }) {
		super(`無効な相談日時: ${reason}`, options);
		this.context = { reason };
	}
}

export class EmptyStringException extends DomainException {
	readonly code = "EMPTY_STRING";
	readonly category = "VALIDATION" as const;
	readonly context: { fieldName: string | undefined };
	readonly hint: string;

	constructor(fieldName?: string, options?: { cause?: unknown }) {
		const detail = fieldName ? ` (${fieldName})` : "";
		super(`空文字は許可されていません${detail}`, options);
		this.context = { fieldName };
		this.hint = fieldName
			? `${fieldName} に空でない値を入力してください`
			: "空でない値を入力してください";
	}
}

// ---------------------------------------------------------------------------
// NOT_FOUND — 集約内でエンティティが見つからない
// ---------------------------------------------------------------------------

export class ExhibitNotFoundException extends DomainException {
	readonly code = "DOMAIN_EXHIBIT_NOT_FOUND";
	readonly category = "NOT_FOUND" as const;
	readonly context: { exhibitId: string };
	readonly hint = "展示IDが正しいか確認してください";

	constructor(exhibitId: string, options?: { cause?: unknown }) {
		super(`指定された展示が見つかりません: ${exhibitId}`, options);
		this.context = { exhibitId };
	}
}

export class LightningTalkNotFoundException extends DomainException {
	readonly code = "DOMAIN_LIGHTNING_TALK_NOT_FOUND";
	readonly category = "NOT_FOUND" as const;
	readonly context: { exhibitId: string };
	readonly hint = "この展示にはライトニングトークが登録されていません";

	constructor(exhibitId: string, options?: { cause?: unknown }) {
		super(`展示に紐づくライトニングトークが存在しません: 展示ID ${exhibitId}`, options);
		this.context = { exhibitId };
	}
}

// ---------------------------------------------------------------------------
// CONFLICT — 重複・競合
// ---------------------------------------------------------------------------

export class ExhibitAlreadyExistsException extends DomainException {
	readonly code = "EXHIBIT_ALREADY_EXISTS";
	readonly category = "CONFLICT" as const;
	readonly context: { exhibitId: string };
	readonly hint = "同一IDの展示が既に登録されています。別の展示IDを使用してください";

	constructor(exhibitId: string, options?: { cause?: unknown }) {
		super(`既に同一の展示が登録されています: ${exhibitId}`, options);
		this.context = { exhibitId };
	}
}

// ---------------------------------------------------------------------------
// INVARIANT_VIOLATION — ビジネスルール違反
// ---------------------------------------------------------------------------

export class LightningTalkExhibitIdMismatchException extends DomainException {
	readonly code = "LIGHTNING_TALK_EXHIBIT_ID_MISMATCH";
	readonly category = "INVARIANT_VIOLATION" as const;
	readonly context: { lightningTalkExhibitId: string; exhibitId: string };
	readonly hint = "ライトニングトークの展示IDが、追加先の展示IDと一致している必要があります";

	constructor(exhibitId: string, lightningTalkExhibitId: string, options?: { cause?: unknown }) {
		super(
			`ライトニングトークの展示IDが一致しません: 展示ID ${exhibitId}, ライトニングトークの展示ID ${lightningTalkExhibitId}`,
			options,
		);
		this.context = { lightningTalkExhibitId, exhibitId };
	}
}

export class ExhibitHasMemberException extends DomainException {
	readonly code = "EXHIBIT_HAS_MEMBER";
	readonly category = "INVARIANT_VIOLATION" as const;
	readonly context: { exhibitId: string; memberId: string };
	readonly hint = "展示からメンバーを先に除外してから、イベントからの削除を行ってください";

	constructor(exhibitId: string, memberId: string, options?: { cause?: unknown }) {
		super(
			`展示にメンバーが所属しているため削除できません: 展示ID ${exhibitId}, メンバーID ${memberId}`,
			options,
		);
		this.context = { exhibitId, memberId };
	}
}

export class InvalidAffiliationOperationException extends DomainException {
	readonly code = "INVALID_AFFILIATION_OPERATION";
	readonly category = "INVARIANT_VIOLATION" as const;
	readonly context: {
		operation: string;
		currentAffiliationType: string;
		reason: string;
	};
	readonly hint: string;

	constructor(
		operation: string,
		currentAffiliationType: string,
		reason: string,
		options?: { cause?: unknown },
	) {
		super(`${operation}に失敗: 現在の所属=${currentAffiliationType}, 理由=${reason}`, options);
		this.context = { operation, currentAffiliationType, reason };
		this.hint = `現在の所属種別（${currentAffiliationType}）では${operation}はできません。${reason}`;
	}
}
