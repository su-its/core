import type { MemberExhibit, Prisma } from "@prisma/client";
import type { IBaseRepository } from "./base.repository.interface";

export interface IMemberExhibitRepository
  extends IBaseRepository<
    MemberExhibit,
    Prisma.MemberExhibitCreateInput,
    Prisma.MemberExhibitUpdateInput,
    Prisma.MemberExhibitFindManyArgs
  > {
  findByMemberId(memberId: string): Promise<MemberExhibit[]>;
  findByExhibitId(exhibitId: string): Promise<MemberExhibit[]>;
}
