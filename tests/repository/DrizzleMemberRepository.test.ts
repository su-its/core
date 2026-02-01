import { describe, expect, it } from "vitest";
import { DrizzleMemberRepository } from "#infrastructure/drizzle/DrizzleMemberRepository";
import { createMember } from "../factories/member";

describe("DrizzleMemberRepository", () => {
	const repository = new DrizzleMemberRepository();

	describe("save / findById", () => {
		it("保存したMemberをIDで取得できる", async () => {
			const member = createMember({ name: "保存テスト" });

			await repository.save(member);
			const found = await repository.findById(member.id);

			expect(found).not.toBeNull();
			expect(found?.id).toBe(member.id);
			expect(found?.getName()).toBe("保存テスト");
		});

		it("存在しないIDはnullを返す", async () => {
			const found = await repository.findById("non-existent-id");

			expect(found).toBeNull();
		});
	});

	describe("findByEmail", () => {
		it("メールアドレスでMemberを取得できる", async () => {
			const member = createMember({ email: "find-by-email@shizuoka.ac.jp" });
			await repository.save(member);

			const found = await repository.findByEmail("find-by-email@shizuoka.ac.jp");

			expect(found).not.toBeNull();
			expect(found?.id).toBe(member.id);
		});

		it("存在しないメールアドレスはnullを返す", async () => {
			const found = await repository.findByEmail("not-exist@shizuoka.ac.jp");

			expect(found).toBeNull();
		});
	});

	describe("save（更新）", () => {
		it("既存Memberの名前を更新できる", async () => {
			const member = createMember({ name: "更新前" });
			await repository.save(member);

			member.setName("更新後");
			await repository.save(member);

			const found = await repository.findById(member.id);
			expect(found?.getName()).toBe("更新後");
		});
	});

	describe("delete", () => {
		it("Memberを削除できる", async () => {
			const member = createMember();
			await repository.save(member);

			await repository.delete(member.id);

			const found = await repository.findById(member.id);
			expect(found).toBeNull();
		});
	});

	describe("findAll", () => {
		it("全Memberを取得できる", async () => {
			const member1 = createMember({ name: "一人目" });
			const member2 = createMember({ name: "二人目" });
			await repository.save(member1);
			await repository.save(member2);

			const all = await repository.findAll();

			expect(all.length).toBeGreaterThanOrEqual(2);
			expect(all.some((m) => m.id === member1.id)).toBe(true);
			expect(all.some((m) => m.id === member2.id)).toBe(true);
		});
	});

	describe("DiscordAccount", () => {
		it("DiscordAccount付きでMemberを保存・取得できる", async () => {
			const member = createMember();
			const { DiscordAccount } = await import(
				"#domain/aggregates/member/DiscordAccount"
			);
			const discordAccount = new DiscordAccount(
				"discord-123",
				"ニックネーム",
				member.id,
			);
			member.addDiscordAccount(discordAccount);

			await repository.save(member);
			const found = await repository.findById(member.id);

			expect(found?.getDiscordAccounts()).toHaveLength(1);
			expect(found?.getDiscordAccounts()[0].getNickName()).toBe("ニックネーム");
		});

		it("findByDiscordAccountIdでMemberを取得できる", async () => {
			const member = createMember();
			const { DiscordAccount } = await import(
				"#domain/aggregates/member/DiscordAccount"
			);
			const discordAccount = new DiscordAccount(
				"discord-456",
				"テスト",
				member.id,
			);
			member.addDiscordAccount(discordAccount);
			await repository.save(member);

			const found = await repository.findByDiscordAccountId("discord-456");

			expect(found).not.toBeNull();
			expect(found?.id).toBe(member.id);
		});
	});
});
