import type { DiscordAccount, PrismaClient, Prisma } from "@prisma/client";
import { BaseRepository } from "./base.repository";
import type { IDiscordAccountRepository } from "./interfaces/discordAccount.repository.interface";

export class DiscordAccountRepository
  extends BaseRepository<
    DiscordAccount,
    Prisma.DiscordAccountCreateInput,
    Prisma.DiscordAccountUpdateInput,
    Prisma.DiscordAccountFindManyArgs
  >
  implements IDiscordAccountRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma, "discordAccount");
  }

  async findById(id: string): Promise<DiscordAccount | null> {
    return this.prisma.discordAccount.findUnique({
      where: { id },
      include: {
        member: true,
      },
    });
  }

  async create(
    data: Prisma.DiscordAccountCreateInput,
  ): Promise<DiscordAccount> {
    return this.prisma.discordAccount.create({
      data,
      include: {
        member: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.DiscordAccountUpdateInput,
  ): Promise<DiscordAccount> {
    return this.prisma.discordAccount.update({
      where: { id },
      data,
      include: {
        member: true,
      },
    });
  }

  async delete(id: string): Promise<DiscordAccount> {
    return this.prisma.discordAccount.delete({
      where: { id },
    });
  }

  async findMany(
    params?: Prisma.DiscordAccountFindManyArgs,
  ): Promise<DiscordAccount[]> {
    return this.prisma.discordAccount.findMany(params);
  }

  async findByMemberId(memberId: string): Promise<DiscordAccount[]> {
    return this.prisma.discordAccount.findMany({
      where: { memberId },
    });
  }

  async findByDiscordId(discordId: string): Promise<DiscordAccount | null> {
    return this.prisma.discordAccount.findFirst({
      where: { discordId },
    });
  }
}
