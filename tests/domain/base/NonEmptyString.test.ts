import { describe, expect, it } from "vitest";
import { nonEmptyString } from "#domain/base/NonEmptyString";
import { EmptyStringException } from "#domain/exceptions";

describe("nonEmptyString", () => {
	describe("正常系", () => {
		it("通常の文字列を生成できる", () => {
			const result = nonEmptyString("hello");
			expect(result).toBe("hello");
		});

		it("前後の空白がトリムされる", () => {
			const result = nonEmptyString("  hello  ");
			expect(result).toBe("hello");
		});

		it("1文字の文字列を生成できる", () => {
			const result = nonEmptyString("a");
			expect(result).toBe("a");
		});

		it("日本語文字列を生成できる", () => {
			const result = nonEmptyString("ノートPC");
			expect(result).toBe("ノートPC");
		});
	});

	describe("異常系", () => {
		it("空文字は例外", () => {
			expect(() => nonEmptyString("")).toThrow(EmptyStringException);
		});

		it("スペースのみは例外", () => {
			expect(() => nonEmptyString("   ")).toThrow(EmptyStringException);
		});

		it("タブのみは例外", () => {
			expect(() => nonEmptyString("\t")).toThrow(EmptyStringException);
		});

		it("改行のみは例外", () => {
			expect(() => nonEmptyString("\n")).toThrow(EmptyStringException);
		});
	});
});
