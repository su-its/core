import { describe, expect, it } from "vitest";
import { workDuration } from "#domain/aggregates/karte/WorkDuration";
import { InvalidWorkDurationException } from "#domain/exceptions";

describe("workDuration", () => {
	describe("正常系", () => {
		it("0分を生成できる", () => {
			expect(workDuration(0)).toBe(0);
		});

		it("正の整数を生成できる", () => {
			expect(workDuration(60)).toBe(60);
		});
	});

	describe("異常系", () => {
		it("負数は無効", () => {
			expect(() => workDuration(-1)).toThrow(InvalidWorkDurationException);
		});

		it("小数は無効", () => {
			expect(() => workDuration(1.5)).toThrow(InvalidWorkDurationException);
		});

		it("NaNは無効", () => {
			expect(() => workDuration(Number.NaN)).toThrow(InvalidWorkDurationException);
		});
	});
});
