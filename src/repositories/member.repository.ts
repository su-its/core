import type { Member, Prisma, PrismaClient } from "@prisma/client";
import { BaseRepository } from "./base.repository";
import type { IMemberRepository } from "./interfaces/member.repository.interface";

export class MemberRepository
  extends BaseRepository<
    Member,
    Prisma.MemberCreateInput,
    Prisma.MemberUpdateInput,
    Prisma.MemberFindManyArgs
  >
  implements IMemberRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma, "member");
  }

  async findById(id: string): Promise<Member | null> {
    return this.prisma.member.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.MemberCreateInput): Promise<Member> {
    return this.prisma.member.create({
      data,
    });
  }

  async update(id: string, data: Prisma.MemberUpdateInput): Promise<Member> {
    return this.prisma.member.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Member> {
    return this.prisma.member.delete({
      where: { id },
    });
  }

  async findMany(params?: Prisma.MemberFindManyArgs): Promise<Member[]> {
    return this.prisma.member.findMany(params);
  }

  async findByEmail(email: string): Promise<Member | null> {
    return this.prisma.member.findUnique({
      where: { email },
    });
  }

  async findByStudentId(studentId: string): Promise<Member[]> {
    return this.prisma.member.findMany({
      where: { studentId },
    });
  }
}
