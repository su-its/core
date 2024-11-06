import type { Exhibit, LightningTalk, Prisma } from "@prisma/client";
import type { IBaseRepository } from "./base.repository.interface";

export interface ILightningTalkRepository
  extends IBaseRepository<
    LightningTalk & { exhibit: Exhibit },
    Prisma.LightningTalkCreateInput,
    Prisma.LightningTalkUpdateInput,
    Prisma.LightningTalkFindManyArgs
  > {
  findByEventId(
    eventId: string,
  ): Promise<(LightningTalk & { exhibit: Exhibit })[]>;
}
