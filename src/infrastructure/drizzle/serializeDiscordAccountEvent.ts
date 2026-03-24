import type { DiscordAccountDomainEvent } from "#domain";
import type { DiscordAccountEventPayload } from "./schema";

export function serializeDiscordAccountEventPayload(
	event: DiscordAccountDomainEvent,
): DiscordAccountEventPayload {
	switch (event.eventName) {
		case "DiscordAccountLinked":
			return { nickName: event.nickName };
		case "NickNameChanged":
			return {
				previousNickName: event.previousNickName,
				newNickName: event.newNickName,
			};
	}
}
