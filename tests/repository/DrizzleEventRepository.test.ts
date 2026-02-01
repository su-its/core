import { describe, expect, it } from "vitest";
import type { Event } from "#domain/aggregates/event/Event";
import { Exhibit } from "#domain/aggregates/event/Exhibit";
import { LightningTalk } from "#domain/aggregates/event/LightningTalk";
import { LightningTalkDuration } from "#domain/value-objects";
import { DrizzleEventRepository } from "#infrastructure/drizzle/DrizzleEventRepository";
import { DrizzleMemberRepository } from "#infrastructure/drizzle/DrizzleMemberRepository";
import { createEvent } from "../factories/event";
import { createMember } from "../factories/member";

describe("DrizzleEventRepository", () => {
	const repository = new DrizzleEventRepository();
	const memberRepository = new DrizzleMemberRepository();

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

		it("LightningTalk付きExhibitを保存・取得できる", async () => {
			const event = createEvent();
			const exhibitId = `exhibit-lt-${Date.now()}`;
			const lightningTalk = new LightningTalk(
				exhibitId,
				new Date("2025-04-01T14:00:00Z"),
				new LightningTalkDuration(10),
			);
			const exhibit = Exhibit.createWithLightningTalk(
				exhibitId,
				"LT付き展示",
				lightningTalk,
				"説明文",
			);
			event.addExhibit(exhibit);

			await repository.save(event);
			const found = await repository.findById(event.id);

			expect(found).not.toBeNull();
			expect(found?.getExhibits()).toHaveLength(1);
			const foundExhibit = found?.getExhibits()[0];
			expect(foundExhibit?.getName()).toBe("LT付き展示");
			expect(foundExhibit?.getLightningTalk()).not.toBeUndefined();
			expect(
				foundExhibit?.getLightningTalk()?.getDurationMinutes().getValue(),
			).toBe(10);
		});

		it("ExhibitにMemberを追加して保存・取得できる", async () => {
			const member = createMember();
			await memberRepository.save(member);

			const event = createEvent();
			const exhibitId = `exhibit-member-${Date.now()}`;
			const exhibit = new Exhibit(exhibitId, "メンバー付き展示");
			exhibit.addMemberId(member.id);
			event.addExhibit(exhibit);

			await repository.save(event);
			const found = await repository.findById(event.id);

			expect(found).not.toBeNull();
			const foundExhibit = found?.getExhibits()[0];
			expect(foundExhibit?.getMemberIds()).toContain(member.id);
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
			expect(all.some((e: Event) => e.id === event1.id)).toBe(true);
			expect(all.some((e: Event) => e.id === event2.id)).toBe(true);
		});
	});

	describe("findByParticipantMemberId", () => {
		it("参加しているMemberのIDでEventを取得できる", async () => {
			const member = createMember();
			await memberRepository.save(member);

			const event = createEvent({ name: "参加イベント" });
			event.addMemberId(member.id);
			await repository.save(event);

			const found = await repository.findByParticipantMemberId(member.id);

			expect(found).toHaveLength(1);
			expect(found[0].id).toBe(event.id);
			expect(found[0].getMemberIds()).toContain(member.id);
		});

		it("複数Eventに参加しているMemberは全て取得できる", async () => {
			const member = createMember();
			await memberRepository.save(member);

			const event1 = createEvent({ name: "イベント1" });
			const event2 = createEvent({ name: "イベント2" });
			event1.addMemberId(member.id);
			event2.addMemberId(member.id);
			await repository.save(event1);
			await repository.save(event2);

			const found = await repository.findByParticipantMemberId(member.id);

			expect(found).toHaveLength(2);
			expect(found.some((e: Event) => e.id === event1.id)).toBe(true);
			expect(found.some((e: Event) => e.id === event2.id)).toBe(true);
		});

		it("参加していないMemberのIDでは空配列を返す", async () => {
			const member = createMember();
			await memberRepository.save(member);

			const event = createEvent({ name: "別のイベント" });
			await repository.save(event);

			const found = await repository.findByParticipantMemberId(member.id);

			expect(found).toHaveLength(0);
		});

		it("存在しないMemberIDでは空配列を返す", async () => {
			const found =
				await repository.findByParticipantMemberId("non-existent-id");

			expect(found).toHaveLength(0);
		});
	});

	describe("findByExhibitId", () => {
		it("ExhibitIDでEventを取得できる", async () => {
			const event = createEvent({ name: "展示イベント" });
			const exhibitId = `exhibit-find-${Date.now()}`;
			const exhibit = new Exhibit(exhibitId, "展示物");
			event.addExhibit(exhibit);
			await repository.save(event);

			const found = await repository.findByExhibitId(exhibitId);

			expect(found).not.toBeNull();
			expect(found?.id).toBe(event.id);
			expect(
				found?.getExhibits().some((e: Exhibit) => e.id === exhibitId),
			).toBe(true);
		});

		it("存在しないExhibitIDではnullを返す", async () => {
			const found = await repository.findByExhibitId("non-existent-exhibit-id");

			expect(found).toBeNull();
		});
	});
});
