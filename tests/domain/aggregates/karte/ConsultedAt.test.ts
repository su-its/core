import { describe, expect, it } from "vite-plus/test";
import {
	dateOnly,
	dateTime,
	parseConsultedAt,
	yearMonth,
	yearOnly,
} from "#domain/aggregates/karte/ConsultedAt";
import { InvalidConsultedAtException } from "#domain/exceptions";

describe("ConsultedAt ファクトリ関数", () => {
	describe("yearOnly", () => {
		it("年のみのConsultedAtを生成する", () => {
			const result = yearOnly(2024);
			expect(result).toEqual({ precision: "year", year: 2024 });
		});
	});

	describe("yearMonth", () => {
		it("年月のConsultedAtを生成する", () => {
			const result = yearMonth(2024, 3);
			expect(result).toEqual({ precision: "yearMonth", year: 2024, month: 3 });
		});

		it("月が1未満なら例外", () => {
			expect(() => yearMonth(2024, 0)).toThrow(InvalidConsultedAtException);
		});

		it("月が13以上なら例外", () => {
			expect(() => yearMonth(2024, 13)).toThrow(InvalidConsultedAtException);
		});

		it("境界値: 1月は有効", () => {
			expect(yearMonth(2024, 1).precision).toBe("yearMonth");
		});

		it("境界値: 12月は有効", () => {
			expect(yearMonth(2024, 12).precision).toBe("yearMonth");
		});
	});

	describe("dateOnly", () => {
		it("日付のみのConsultedAtを生成する", () => {
			const input = new Date("2024-03-15T00:00:00");
			const result = dateOnly(input);
			expect(result.precision).toBe("date");
			if (result.precision === "date") {
				expect(result.value.getFullYear()).toBe(2024);
				expect(result.value.getMonth()).toBe(2); // 0-indexed
				expect(result.value.getDate()).toBe(15);
			}
		});

		it("元のDateを変更しても影響しない（防御的コピー）", () => {
			const input = new Date("2024-03-15T00:00:00");
			const result = dateOnly(input);
			input.setFullYear(2000);
			if (result.precision === "date") {
				expect(result.value.getFullYear()).toBe(2024);
			}
		});
	});

	describe("dateTime", () => {
		it("日時のConsultedAtを生成する", () => {
			const input = new Date("2024-03-15T10:30:00Z");
			const result = dateTime(input);
			expect(result.precision).toBe("datetime");
			if (result.precision === "datetime") {
				expect(result.value.toISOString()).toBe("2024-03-15T10:30:00.000Z");
			}
		});

		it("元のDateを変更しても影響しない（防御的コピー）", () => {
			const input = new Date("2024-03-15T10:30:00Z");
			const result = dateTime(input);
			input.setFullYear(2000);
			if (result.precision === "datetime") {
				expect(result.value.getFullYear()).toBe(2024);
			}
		});
	});
});

describe("parseConsultedAt", () => {
	it("YYYY → yearOnly", () => {
		const result = parseConsultedAt("2005");
		expect(result).toEqual({ precision: "year", year: 2005 });
	});

	it("YYYY-MM → yearMonth", () => {
		const result = parseConsultedAt("2005-02");
		expect(result).toEqual({ precision: "yearMonth", year: 2005, month: 2 });
	});

	it("YYYY-M（1桁月）→ yearMonth", () => {
		const result = parseConsultedAt("2005-2");
		expect(result).toEqual({ precision: "yearMonth", year: 2005, month: 2 });
	});

	it("YYYY-MM-DD → dateOnly", () => {
		const result = parseConsultedAt("2005-02-17");
		expect(result.precision).toBe("date");
	});

	it("ISO形式の日時 → dateTime", () => {
		const result = parseConsultedAt("2005-02-17T10:00:00");
		expect(result.precision).toBe("datetime");
	});

	it("スペース区切りの日時 → dateTime", () => {
		const result = parseConsultedAt("2005-02-17 10:00:00");
		expect(result.precision).toBe("datetime");
	});

	it("スラッシュ区切り → ハイフンに正規化される", () => {
		const result = parseConsultedAt("2005/02/17");
		expect(result.precision).toBe("date");
	});

	it("スラッシュ区切りの日時 → dateTime", () => {
		const result = parseConsultedAt("2005/02/17 10:00:00");
		expect(result.precision).toBe("datetime");
	});

	it("前後の空白はトリムされる", () => {
		const result = parseConsultedAt("  2005  ");
		expect(result).toEqual({ precision: "year", year: 2005 });
	});

	it("パース不能な文字列は例外", () => {
		expect(() => parseConsultedAt("not-a-date")).toThrow(InvalidConsultedAtException);
	});

	it("空文字は例外", () => {
		expect(() => parseConsultedAt("")).toThrow(InvalidConsultedAtException);
	});

	it("YYYY-MM で月が範囲外なら例外", () => {
		expect(() => parseConsultedAt("2005-13")).toThrow(InvalidConsultedAtException);
	});
});
