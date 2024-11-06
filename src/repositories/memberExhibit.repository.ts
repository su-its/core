import type { MemberExhibit, PrismaClient, Prisma } from "@prisma/client";
import { BaseRepository } from "./base.repository";
import type { IMemberExhibitRepository } from "./interfaces/memberExhibit.repository.interface";

export class MemberExhibitRepository
  extends BaseRepository<
    MemberExhibit,
    Prisma.MemberExhibitCreateInput,
    Prisma.MemberExhibitUpdateInput,
    Prisma.MemberExhibitFindManyArgs
  >
  implements IMemberExhibitRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma, "memberExhibit");
  }

  async findById(id: string): Promise<MemberExhibit | null> {
    return this.prisma.memberExhibit.findUnique({
      where: { id },
      include: {
        member: true,
        exhibit: true,
      },
    });
  }

  async create(data: Prisma.MemberExhibitCreateInput): Promise<MemberExhibit> {
    return this.prisma.memberExhibit.create({
      data,
      include: {
        member: true,
        exhibit: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.MemberExhibitUpdateInput,
  ): Promise<MemberExhibit> {
    return this.prisma.memberExhibit.update({
      where: { id },
      data,
      include: {
        member: true,
        exhibit: true,
      },
    });
  }

  async delete(id: string): Promise<MemberExhibit> {
    return this.prisma.memberExhibit.delete({
      where: { id },
    });
  }

  async findMany(
    params?: Prisma.MemberExhibitFindManyArgs,
  ): Promise<MemberExhibit[]> {
    return this.prisma.memberExhibit.findMany(params);
  }

  async findByMemberId(memberId: string): Promise<MemberExhibit[]> {
    return this.prisma.memberExhibit.findMany({
      where: { memberId },
      include: {
        exhibit: true,
      },
    });
  }

  async findByExhibitId(exhibitId: string): Promise<MemberExhibit[]> {
    return this.prisma.memberExhibit.findMany({
      where: { exhibitId },
      include: {
        member: true,
      },
    });
  }
}
