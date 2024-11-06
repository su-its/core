import type { DiscordAccount, Prisma } from "@prisma/client";
import type { IBaseRepository } from "./base.repository.interface";

export interface IDiscordAccountRepository
  extends IBaseRepository<
    DiscordAccount,
    Prisma.DiscordAccountCreateInput,
    Prisma.DiscordAccountUpdateInput,
    Prisma.DiscordAccountFindManyArgs
  > {
  findByMemberId(memberId: string): Promise<DiscordAccount[]>;
  findByDiscordId(discordId: string): Promise<DiscordAccount | null>;
}
