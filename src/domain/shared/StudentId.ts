import { ValueObject } from "#domain/base/ValueObject";
import { InvalidStudentIdException } from "#domain/exceptions";

/**
 * 学籍番号
 *
 * 2つのフォーマットに対応する:
 * - 旧形式: 8桁の数字（例: 70312031）
 * - 新形式: 数字3桁 + アルファベット1文字 + 数字4桁（例: 725A1061）
 *
 * アルファベットは大文字に正規化して保持する。
 */
export class StudentId extends ValueObject<string> {
	private static readonly OLD_FORMAT = /^[0-9]{8}$/;
	private static readonly NEW_FORMAT = /^[0-9]{3}[A-Z][0-9]{4}$/;

	private constructor(value: string) {
		super(value);
	}

	static fromString(value: string): StudentId {
		return new StudentId(value.trim().toUpperCase());
	}

	protected validate(): void {
		const isValid =
			StudentId.OLD_FORMAT.test(this.value) ||
			StudentId.NEW_FORMAT.test(this.value);
		this.throwIfInvalid(isValid, new InvalidStudentIdException(this.value));
	}
}
