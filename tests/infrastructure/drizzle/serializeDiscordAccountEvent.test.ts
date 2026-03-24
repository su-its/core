import { describe, expect, it } from "vite-plus/test";
import { DiscordAccount, discordId, memberId } from "#domain";
import { serializeDiscordAccountEventPayload } from "#infrastructure/drizzle/serializeDiscordAccountEvent";

describe("serializeDiscordAccountEventPayload", () => {
	it("DiscordAccountLinkedイベントをシリアライズできる", () => {
		const account = DiscordAccount.link(
			discordId("123456789"),
			memberId("member-1"),
			"テストユーザー",
		);
		const events = account.getDomainEvents();
		expect(events).toHaveLength(1);

		const payload = serializeDiscordAccountEventPayload(events[0]);
		expect(payload).toEqual({
			nickName: "テストユーザー",
		});
	});

	it("reconstruct経由ではイベントが発生しない", () => {
		const account = DiscordAccount.reconstruct(
			discordId("123456789"),
			memberId("member-1"),
			"テストユーザー",
		);
		const events = account.getDomainEvents();
		expect(events).toHaveLength(0);
	});
});
