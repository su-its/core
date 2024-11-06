import type {
  Exhibit,
  LightningTalk,
  Prisma,
  PrismaClient,
} from "@prisma/client";
import { BaseRepository } from "./base.repository";
import type { ILightningTalkRepository } from "./interfaces/lightningTalk.repository.interface";

export class LightningTalkRepository
  extends BaseRepository<
    LightningTalk & { exhibit: Exhibit },
    Prisma.LightningTalkCreateInput,
    Prisma.LightningTalkUpdateInput,
    Prisma.LightningTalkFindManyArgs
  >
  implements ILightningTalkRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma, "lightningTalk");
  }

  async create(
    data: Prisma.LightningTalkCreateInput,
  ): Promise<LightningTalk & { exhibit: Exhibit }> {
    return this.prisma.lightningTalk.create({
      data,
      include: { exhibit: true },
    });
  }

  async update(
    id: string,
    data: Prisma.LightningTalkUpdateInput,
  ): Promise<LightningTalk & { exhibit: Exhibit }> {
    return this.prisma.lightningTalk.update({
      where: { exhibitId: id },
      data,
      include: { exhibit: true },
    });
  }

  async delete(id: string): Promise<LightningTalk & { exhibit: Exhibit }> {
    return this.prisma.lightningTalk.delete({
      where: { exhibitId: id },
      include: { exhibit: true },
    });
  }

  async findById(
    id: string,
  ): Promise<(LightningTalk & { exhibit: Exhibit }) | null> {
    return this.prisma.lightningTalk.findUnique({
      where: { exhibitId: id },
      include: { exhibit: true },
    });
  }

  async findByEventId(
    eventId: string,
  ): Promise<(LightningTalk & { exhibit: Exhibit })[]> {
    return this.prisma.lightningTalk.findMany({
      where: {
        exhibit: {
          eventId,
        },
      },
      include: { exhibit: true },
    });
  }

  async findMany(
    args?: Prisma.LightningTalkFindManyArgs,
  ): Promise<(LightningTalk & { exhibit: Exhibit })[]> {
    return this.prisma.lightningTalk.findMany({
      ...args,
      include: { ...args?.include, exhibit: true },
    });
  }
}
