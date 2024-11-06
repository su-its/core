import type { Exhibit, Prisma } from "@prisma/client";
import type { IBaseRepository } from "./base.repository.interface";

export interface IExhibitRepository
  extends IBaseRepository<
    Exhibit,
    Prisma.ExhibitCreateInput,
    Prisma.ExhibitUpdateInput,
    Prisma.ExhibitFindManyArgs
  > {
  findByEventId(eventId: string): Promise<Exhibit[]>;
  findWithMembers(id: string): Promise<Exhibit | null>;
}
