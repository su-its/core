import type { Member, Prisma } from "@prisma/client";
import type { IBaseRepository } from "./base.repository.interface";

export interface IMemberRepository
  extends IBaseRepository<
    Member,
    Prisma.MemberCreateInput,
    Prisma.MemberUpdateInput,
    Prisma.MemberFindManyArgs
  > {
  findByEmail(email: string): Promise<Member | null>;
  findByStudentId(studentId: string): Promise<Member[]>;
}
