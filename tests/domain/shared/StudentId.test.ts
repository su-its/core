import { describe, expect, it } from "vitest";
import { InvalidStudentIdException } from "#domain/exceptions";
import { StudentId } from "#domain/shared/StudentId";

describe("StudentId", () => {
	describe("fromString", () => {
		it("旧形式（8桁数字）の学籍番号を生成できる", () => {
			const id = StudentId.fromString("70312031");
			expect(id.getValue()).toBe("70312031");
		});

		it("新形式（3桁数字+英字+4桁数字）の学籍番号を生成できる", () => {
			const id = StudentId.fromString("725A1061");
			expect(id.getValue()).toBe("725A1061");
		});

		it("小文字の英字を大文字に正規化する", () => {
			const id = StudentId.fromString("725a1061");
			expect(id.getValue()).toBe("725A1061");
		});

		it("前後の空白をトリムする", () => {
			const id = StudentId.fromString("  70312031  ");
			expect(id.getValue()).toBe("70312031");
		});
	});

	describe("バリデーション", () => {
		it("7桁の数字は無効", () => {
			expect(() => StudentId.fromString("7031203")).toThrow(
				InvalidStudentIdException,
			);
		});

		it("9桁の数字は無効", () => {
			expect(() => StudentId.fromString("703120310")).toThrow(
				InvalidStudentIdException,
			);
		});

		it("空文字は無効", () => {
			expect(() => StudentId.fromString("")).toThrow(InvalidStudentIdException);
		});

		it("英字のみは無効", () => {
			expect(() => StudentId.fromString("ABCDEFGH")).toThrow(
				InvalidStudentIdException,
			);
		});

		it("新形式で英字が2文字あると無効", () => {
			expect(() => StudentId.fromString("72AB1061")).toThrow(
				InvalidStudentIdException,
			);
		});

		it("新形式で英字の位置が異なると無効", () => {
			expect(() => StudentId.fromString("7A251061")).toThrow(
				InvalidStudentIdException,
			);
		});
	});

	describe("isValid", () => {
		it("旧形式（8桁数字）はtrue", () => {
			expect(StudentId.isValid("70312031")).toBe(true);
		});

		it("新形式（3桁数字+英字+4桁数字）はtrue", () => {
			expect(StudentId.isValid("725A1061")).toBe(true);
		});

		it("小文字の英字を正規化して判定する", () => {
			expect(StudentId.isValid("725a1061")).toBe(true);
		});

		it("前後の空白をトリムして判定する", () => {
			expect(StudentId.isValid("  70312031  ")).toBe(true);
		});

		it("不正な形式はfalse", () => {
			expect(StudentId.isValid("")).toBe(false);
			expect(StudentId.isValid("7031203")).toBe(false);
			expect(StudentId.isValid("ABCDEFGH")).toBe(false);
			expect(StudentId.isValid("72AB1061")).toBe(false);
		});
	});

	describe("equals", () => {
		it("同じ学籍番号は等しい", () => {
			const a = StudentId.fromString("725A1061");
			const b = StudentId.fromString("725a1061");
			expect(a.equals(b)).toBe(true);
		});

		it("異なる学籍番号は等しくない", () => {
			const a = StudentId.fromString("725A1061");
			const b = StudentId.fromString("70312031");
			expect(a.equals(b)).toBe(false);
		});
	});
});
