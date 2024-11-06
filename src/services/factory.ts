import type { Repositories } from "../repositories";
import { DiscordAccountService } from "./discordAccount.service";
import { EventService } from "./event.service";
import { ExhibitService } from "./exhibit.service";
import { LightningTalkService } from "./lightningTalk.service";
import { MemberService } from "./member.service";

export const createServices = (repositories: Repositories) => {
  return {
    member: new MemberService(repositories.member, repositories.discordAccount),
    discordAccount: new DiscordAccountService(
      repositories.discordAccount,
      repositories.member,
    ),
    event: new EventService(
      repositories.event,
      repositories.member,
      repositories.memberEvent,
    ),
    exhibit: new ExhibitService(
      repositories.exhibit,
      repositories.event,
      repositories.member,
      repositories.memberExhibit,
    ),
    lightningTalk: new LightningTalkService(
      repositories.lightningTalk,
      repositories.exhibit,
    ),
  };
};

export type Services = ReturnType<typeof createServices>;
