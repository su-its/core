import type { Prisma } from "@prisma/client";
import type { IBaseRepository } from "./base.repository.interface";

type DefaultInclude = { exhibit: true };

export interface ILightningTalkRepository
  extends IBaseRepository<
    Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>,
    Prisma.LightningTalkCreateInput,
    Prisma.LightningTalkUpdateInput,
    Prisma.LightningTalkFindManyArgs
  > {
  create(
    data: Prisma.LightningTalkCreateInput,
  ): Promise<Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>>;

  update(
    id: string,
    data: Prisma.LightningTalkUpdateInput,
  ): Promise<Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>>;

  delete(
    id: string,
  ): Promise<Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>>;

  findById<T extends Prisma.LightningTalkInclude>(
    id: string,
    include?: T,
  ): Promise<Prisma.LightningTalkGetPayload<{
    include: DefaultInclude;
  }> | null>;

  findByEventId<T extends Prisma.LightningTalkInclude>(
    eventId: string,
    include?: T,
  ): Promise<Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>[]>;

  findMany(
    args?: Omit<Prisma.LightningTalkFindManyArgs, "include">,
  ): Promise<Prisma.LightningTalkGetPayload<{ include: DefaultInclude }>[]>;
}
