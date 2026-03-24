import { describe, expect, it } from "vite-plus/test";
import { ValueObject } from "#domain";

class StringVO extends ValueObject<string> {
	protected validate(): void {
		if (this.value.length === 0) {
			this.throwIfInvalid(false, new Error("empty"));
		}
	}
}

class ObjectVO extends ValueObject<{ a: number; b: string }> {
	protected validate(): void {}
}

describe("ValueObject", () => {
	describe("getValue", () => {
		it("コンストラクタに渡した値を返す", () => {
			const vo = new StringVO("hello");
			expect(vo.getValue()).toBe("hello");
		});
	});

	describe("equals", () => {
		it("同じ値を持つインスタンス同士はtrueを返す", () => {
			const a = new StringVO("hello");
			const b = new StringVO("hello");
			expect(a.equals(b)).toBe(true);
		});

		it("異なる値を持つインスタンス同士はfalseを返す", () => {
			const a = new StringVO("hello");
			const b = new StringVO("world");
			expect(a.equals(b)).toBe(false);
		});

		it("undefinedとの比較はfalseを返す", () => {
			const a = new StringVO("hello");
			expect(a.equals(undefined)).toBe(false);
		});

		it("オブジェクト型でもJSON表現が同じならtrueを返す", () => {
			const a = new ObjectVO({ a: 1, b: "x" });
			const b = new ObjectVO({ a: 1, b: "x" });
			expect(a.equals(b)).toBe(true);
		});

		it("オブジェクト型で値が異なればfalseを返す", () => {
			const a = new ObjectVO({ a: 1, b: "x" });
			const b = new ObjectVO({ a: 2, b: "x" });
			expect(a.equals(b)).toBe(false);
		});
	});

	describe("validate", () => {
		it("バリデーション失敗時に例外を投げる", () => {
			expect(() => new StringVO("")).toThrow("empty");
		});

		it("バリデーション成功時は例外を投げない", () => {
			expect(() => new StringVO("valid")).not.toThrow();
		});
	});
});
