import type { Prisma } from "@prisma/client";
import type { IExhibitRepository } from "../repositories/interfaces/exhibit.repository.interface";
import type { ILightningTalkRepository } from "../repositories/interfaces/lightningTalk.repository.interface";
import { BaseService } from "./base.service";
import type {
  ILightningTalkService,
  LightningTalkCreateDTO,
  LightningTalkUpdateDTO,
  LightningTalkWithAll,
  LightningTalkWithExhibit,
} from "./interfaces/lightningTalk.service.interface";

export class LightningTalkService
  extends BaseService<
    LightningTalkWithExhibit,
    LightningTalkCreateDTO,
    LightningTalkUpdateDTO,
    Prisma.LightningTalkFindManyArgs,
    Prisma.LightningTalkCreateInput,
    Prisma.LightningTalkUpdateInput,
    ILightningTalkRepository
  >
  implements ILightningTalkService
{
  constructor(
    lightningTalkrepository: ILightningTalkRepository,
    private readonly exhibitRepository: IExhibitRepository,
  ) {
    super(lightningTalkrepository);
  }

  async findById(id: string): Promise<LightningTalkWithAll | null> {
    return this.repository.findById(id, {
      exhibit: {
        include: {
          event: true,
          members: {
            include: {
              member: true,
            },
          },
        },
      },
    });
  }

  async create(
    data: LightningTalkCreateDTO,
  ): Promise<LightningTalkWithExhibit> {
    const exhibit = await this.exhibitRepository.findById(data.exhibitId);
    if (!exhibit) {
      throw new Error("Exhibit not found");
    }

    const existingLT = await this.repository.findById(data.exhibitId);
    if (existingLT) {
      throw new Error("This exhibit is already registered as a lightning talk");
    }

    return this.repository.create({
      exhibit: { connect: { id: data.exhibitId } },
      startTime: data.startTime,
      duration: data.duration,
      slideUrl: data.slideUrl,
    });
  }

  async update(
    id: string,
    data: LightningTalkUpdateDTO,
  ): Promise<LightningTalkWithExhibit> {
    const lightningTalk = await this.repository.findById(id);
    if (!lightningTalk) {
      throw new Error("Lightning talk not found");
    }

    return this.repository.update(id, {
      startTime: data.startTime,
      duration: data.duration,
      slideUrl: data.slideUrl,
    });
  }

  async delete(id: string): Promise<LightningTalkWithExhibit> {
    const lightningTalk = await this.repository.findById(id);
    if (!lightningTalk) {
      throw new Error("Lightning talk not found");
    }

    return this.repository.delete(id);
  }

  async findMany(): Promise<LightningTalkWithExhibit[]> {
    return this.repository.findMany();
  }

  async findByEventId(eventId: string): Promise<LightningTalkWithAll[]> {
    return this.repository.findByEventId(eventId, {
      exhibit: {
        include: {
          event: true,
          members: {
            include: {
              member: true,
            },
          },
        },
      },
    });
  }
}
