import type { Exhibit, Prisma, PrismaClient } from "@prisma/client";
import { BaseRepository } from "./base.repository";
import type { IExhibitRepository } from "./interfaces/exhibit.repository.interface";

export class ExhibitRepository
  extends BaseRepository<
    Exhibit,
    Prisma.ExhibitCreateInput,
    Prisma.ExhibitUpdateInput,
    Prisma.ExhibitFindManyArgs
  >
  implements IExhibitRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma, "exhibit");
  }

  async findById(id: string): Promise<Exhibit | null> {
    return this.prisma.exhibit.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ExhibitCreateInput): Promise<Exhibit> {
    return this.prisma.exhibit.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ExhibitUpdateInput): Promise<Exhibit> {
    return this.prisma.exhibit.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Exhibit> {
    return this.prisma.exhibit.delete({
      where: { id },
    });
  }

  async findMany(params?: Prisma.ExhibitFindManyArgs): Promise<Exhibit[]> {
    return this.prisma.exhibit.findMany(params);
  }

  async findByEventId(eventId: string): Promise<Exhibit[]> {
    return this.prisma.exhibit.findMany({
      where: { eventId },
      include: {
        members: {
          include: {
            member: true,
          },
        },
      },
    });
  }

  async findWithMembers(id: string): Promise<Exhibit | null> {
    return this.prisma.exhibit.findUnique({
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
}
