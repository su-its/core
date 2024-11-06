import type { MemberEvent, Prisma } from "@prisma/client";
import type { IBaseRepository } from "./base.repository.interface";

export interface IMemberEventRepository
  extends IBaseRepository<
    MemberEvent,
    Prisma.MemberEventCreateInput,
    Prisma.MemberEventUpdateInput,
    Prisma.MemberEventFindManyArgs
  > {
  findByMemberId(memberId: string): Promise<MemberEvent[]>;
  findByEventId(eventId: string): Promise<MemberEvent[]>;
}
