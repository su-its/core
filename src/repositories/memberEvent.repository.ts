import type { MemberEvent, PrismaClient, Prisma } from "@prisma/client";
import { BaseRepository } from "./base.repository";
import type { IMemberEventRepository } from "./interfaces/memberEvent.repository.interface";

export class MemberEventRepository
  extends BaseRepository<
    MemberEvent,
    Prisma.MemberEventCreateInput,
    Prisma.MemberEventUpdateInput,
    Prisma.MemberEventFindManyArgs
  >
  implements IMemberEventRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma, "memberEvent");
  }

  async findById(id: string): Promise<MemberEvent | null> {
    return this.prisma.memberEvent.findUnique({
      where: { id },
      include: {
        member: true,
        event: true,
      },
    });
  }

  async create(data: Prisma.MemberEventCreateInput): Promise<MemberEvent> {
    return this.prisma.memberEvent.create({
      data,
      include: {
        member: true,
        event: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.MemberEventUpdateInput,
  ): Promise<MemberEvent> {
    return this.prisma.memberEvent.update({
      where: { id },
      data,
      include: {
        member: true,
        event: true,
      },
    });
  }

  async delete(id: string): Promise<MemberEvent> {
    return this.prisma.memberEvent.delete({
      where: { id },
    });
  }

  async findMany(
    params?: Prisma.MemberEventFindManyArgs,
  ): Promise<MemberEvent[]> {
    return this.prisma.memberEvent.findMany(params);
  }

  async findByMemberId(memberId: string): Promise<MemberEvent[]> {
    return this.prisma.memberEvent.findMany({
      where: { memberId },
      include: {
        event: true,
      },
    });
  }

  async findByEventId(eventId: string): Promise<MemberEvent[]> {
    return this.prisma.memberEvent.findMany({
      where: { eventId },
      include: {
        member: true,
      },
    });
  }
}
