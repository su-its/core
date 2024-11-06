import type { Event, Prisma } from "@prisma/client";
import type { IBaseRepository } from "./base.repository.interface";

export interface IEventRepository
  extends IBaseRepository<
    Event,
    Prisma.EventCreateInput,
    Prisma.EventUpdateInput,
    Prisma.EventFindManyArgs
  > {
  findUpcoming(limit?: number): Promise<Event[]>;
  findWithMembers(id: string): Promise<Event | null>;
  findWithExhibits(id: string): Promise<Event | null>;
}
