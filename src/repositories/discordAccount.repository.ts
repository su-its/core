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

  async findById(discordId: string): Promise<DiscordAccount | null> {
    return this.prisma.discordAccount.findUnique({
      where: { id: discordId },
      include: {
        member: true,
      },
    });
  }

  async create(
    data: Prisma.DiscordAccountCreateInput,
  ): Promise<DiscordAccount> {
    return this.prisma.discordAccount.create({
      data: {
        ...data,
        id: data.id, // NOTE: ここでDiscordIDを指定
      },
      include: {
        member: true,
      },
    });
  }

  async update(
    discordId: string,
    data: Prisma.DiscordAccountUpdateInput,
  ): Promise<DiscordAccount> {
    return this.prisma.discordAccount.update({
      where: { id: discordId },
      data,
      include: {
        member: true,
      },
    });
  }

  async delete(discordId: string): Promise<DiscordAccount> {
    return this.prisma.discordAccount.delete({
      where: { id: discordId },
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
}
