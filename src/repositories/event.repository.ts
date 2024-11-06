import type { Event, Prisma, PrismaClient } from "@prisma/client";
import { BaseRepository } from "./base.repository";
import type { IEventRepository } from "./interfaces/event.repository.interface";

export class EventRepository
  extends BaseRepository<
    Event,
    Prisma.EventCreateInput,
    Prisma.EventUpdateInput,
    Prisma.EventFindManyArgs
  >
  implements IEventRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma, "event");
  }

  async findById(id: string): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.EventCreateInput): Promise<Event> {
    return this.prisma.event.create({
      data,
    });
  }

  async update(id: string, data: Prisma.EventUpdateInput): Promise<Event> {
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Event> {
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async findMany(params?: Prisma.EventFindManyArgs): Promise<Event[]> {
    return this.prisma.event.findMany(params);
  }

  async findUpcoming(limit?: number): Promise<Event[]> {
    return this.prisma.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: "asc",
      },
      take: limit,
    });
  }

  async findWithMembers(id: string): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            member: true,
          },
        },
      },
    });
  }

  async findWithExhibits(id: string): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        exhibits: true,
      },
    });
  }
}
