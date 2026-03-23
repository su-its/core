import type { DiscordAccountDomainEvent } from "#domain/aggregates/discord-account/DiscordAccount";
import type { SerializedDiscordAccountEventPayload } from "./schema";

export function serializeDiscordAccountEventPayload(
	event: DiscordAccountDomainEvent,
): SerializedDiscordAccountEventPayload {
	switch (event.eventName) {
		case "DiscordAccountLinked":
			return { eventName: "DiscordAccountLinked", nickName: event.nickName };
	}
}
