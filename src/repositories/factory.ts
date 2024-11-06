import type { PrismaClient } from "@prisma/client";
import { MemberRepository } from "./member.repository";
import { DiscordAccountRepository } from "./discordAccount.repository";
import { EventRepository } from "./event.repository";
import { ExhibitRepository } from "./exhibit.repository";
import { MemberEventRepository } from "./memberEvent.repository";
import { MemberExhibitRepository } from "./memberExhibit.repository";

export const createRepositories = (prisma: PrismaClient) => {
  return {
    member: new MemberRepository(prisma),
    discordAccount: new DiscordAccountRepository(prisma),
    event: new EventRepository(prisma),
    exhibit: new ExhibitRepository(prisma),
    memberEvent: new MemberEventRepository(prisma),
    memberExhibit: new MemberExhibitRepository(prisma),
  };
};

export type Repositories = ReturnType<typeof createRepositories>;
