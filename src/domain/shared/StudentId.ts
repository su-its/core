import { ValueObject } from "#domain/base/ValueObject";
import { InvalidStudentIdException } from "#domain/exceptions";

/**
 * 学籍番号
 *
 * 2つのフォーマットに対応する:
 * - 数字8桁（例: 70312031）
 * - 数字3桁 + アルファベット1文字 + 数字4桁（例: 725A1061）
 *
 * 2025年度入学者から英字を含む形式に変更された。
 * アルファベットは大文字に正規化して保持する。
 */
export class StudentId extends ValueObject<string> {
	private static readonly NUMERIC_ONLY = /^[0-9]{8}$/;
	private static readonly ALPHANUMERIC = /^[0-9]{3}[A-Z][0-9]{4}$/;

	private constructor(value: string) {
		super(value);
	}

	static fromString(value: string): StudentId {
		return new StudentId(value.trim().toUpperCase());
	}

	protected validate(): void {
		const isValid =
			StudentId.NUMERIC_ONLY.test(this.value) ||
			StudentId.ALPHANUMERIC.test(this.value);
		if (!isValid) {
			throw new InvalidStudentIdException(this.value);
		}
	}
}
