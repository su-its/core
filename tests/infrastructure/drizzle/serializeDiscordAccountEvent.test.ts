import { describe, expect, it } from "vitest";
import { DiscordAccount } from "#domain/aggregates/discord-account/DiscordAccount";
import { discordId } from "#domain/aggregates/discord-account/DiscordId";
import { memberId } from "#domain/aggregates/member/MemberId";
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
      eventName: "DiscordAccountLinked",
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
