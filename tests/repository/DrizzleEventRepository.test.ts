import { describe, expect, it } from "vitest";
import { Exhibit } from "#domain/aggregates/event/Exhibit";
import { DrizzleEventRepository } from "#infrastructure/drizzle/DrizzleEventRepository";
import { createEvent } from "../factories/event";

describe("DrizzleEventRepository", () => {
	const repository = new DrizzleEventRepository();

	describe("save / findById", () => {
		it("保存したEventをIDで取得できる", async () => {
			const event = createEvent({ name: "保存テスト" });

			await repository.save(event);
			const found = await repository.findById(event.id);

			expect(found).not.toBeNull();
			expect(found?.id).toBe(event.id);
			expect(found?.getName()).toBe("保存テスト");
		});

		it("存在しないIDはnullを返す", async () => {
			const found = await repository.findById("non-existent-id");

			expect(found).toBeNull();
		});
	});

	describe("save（更新）", () => {
		it("既存Eventの名前を更新できる", async () => {
			const event = createEvent({ name: "更新前" });
			await repository.save(event);

			event.changeName("更新後");
			await repository.save(event);

			const found = await repository.findById(event.id);
			expect(found?.getName()).toBe("更新後");
		});
	});

	describe("Exhibit", () => {
		it("Exhibit付きでEventを保存・取得できる", async () => {
			const event = createEvent();
			const exhibitId = `exhibit-save-${Date.now()}`;
			const exhibit = new Exhibit(exhibitId, "展示物A", "説明文");
			event.addExhibit(exhibit);

			await repository.save(event);
			const found = await repository.findById(event.id);

			expect(found).not.toBeNull();
			expect(found?.getExhibits()).toHaveLength(1);
			expect(found?.getExhibits()[0].getName()).toBe("展示物A");
		});

		it("Exhibitを削除するとDBからも削除される", async () => {
			const event = createEvent();
			const exhibitId = `exhibit-delete-${Date.now()}`;
			const exhibit = new Exhibit(exhibitId, "削除予定");
			event.addExhibit(exhibit);
			await repository.save(event);

			event.removeExhibit(exhibitId);
			await repository.save(event);

			const found = await repository.findById(event.id);
			expect(found).not.toBeNull();
			expect(found?.getExhibits()).toHaveLength(0);
		});
	});

	describe("delete", () => {
		it("Eventを削除できる", async () => {
			const event = createEvent();
			await repository.save(event);

			await repository.delete(event.id);

			const found = await repository.findById(event.id);
			expect(found).toBeNull();
		});

		it("Exhibit付きEventも削除できる", async () => {
			const event = createEvent();
			const exhibitId = `exhibit-cascade-${Date.now()}`;
			event.addExhibit(new Exhibit(exhibitId, "カスケード削除"));
			await repository.save(event);

			await repository.delete(event.id);

			const found = await repository.findById(event.id);
			expect(found).toBeNull();
		});
	});

	describe("findAll", () => {
		it("全Eventを取得できる", async () => {
			const event1 = createEvent({ name: "イベント1" });
			const event2 = createEvent({ name: "イベント2" });
			await repository.save(event1);
			await repository.save(event2);

			const all = await repository.findAll();

			expect(all.length).toBeGreaterThanOrEqual(2);
			expect(all.some((e) => e.id === event1.id)).toBe(true);
			expect(all.some((e) => e.id === event2.id)).toBe(true);
		});
	});
});
