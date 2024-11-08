import type { Prisma, PrismaClient } from "@prisma/client";
import { BaseRepository } from "./base.repository";
import type { ILightningTalkRepository } from "./interfaces/lightningTalk.repository.interface";

type DefaultInclude = { exhibit: true };

export class LightningTalkRepository
  extends BaseRepository<
    Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>,
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
  ): Promise<Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>> {
    return this.prisma.lightningTalk.create({
      data,
      include: { exhibit: true },
    });
  }

  async update(
    id: string,
    data: Prisma.LightningTalkUpdateInput,
  ): Promise<Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>> {
    return this.prisma.lightningTalk.update({
      where: { exhibitId: id },
      data,
      include: { exhibit: true },
    });
  }

  async delete(
    id: string,
  ): Promise<Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>> {
    return this.prisma.lightningTalk.delete({
      where: { exhibitId: id },
      include: { exhibit: true },
    });
  }

  async findById(
    id: string,
    include?: Prisma.LightningTalkInclude,
  ): Promise<Prisma.LightningTalkGetPayload<{
    include: DefaultInclude;
  }> | null> {
    return this.prisma.lightningTalk.findUnique({
      where: { exhibitId: id },
      include: { ...include, exhibit: true },
    });
  }

  async findByEventId(
    eventId: string,
    include?: Prisma.LightningTalkInclude,
  ): Promise<Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>[]> {
    return this.prisma.lightningTalk.findMany({
      where: {
        exhibit: {
          eventId,
        },
      },
      include: { ...include, exhibit: true },
    });
  }

  async findMany(
    args?: Omit<Prisma.LightningTalkFindManyArgs, "include">,
  ): Promise<Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>[]> {
    return this.prisma.lightningTalk.findMany({
      ...args,
      include: { exhibit: true },
    });
  }
}
