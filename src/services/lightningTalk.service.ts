import type { Exhibit, LightningTalk, Prisma } from "@prisma/client";
import type { IExhibitRepository } from "../repositories/interfaces/exhibit.repository.interface";
import type { ILightningTalkRepository } from "../repositories/interfaces/lightningTalk.repository.interface";
import type { LightningTalkRepository } from "../repositories/lightningTalk.repository";
import { BaseService } from "./base.service";
import type {
  ILightningTalkService,
  LightningTalkCreateDTO,
  LightningTalkUpdateDTO,
} from "./interfaces/lightningTalk.service.interface";

export class LightningTalkService
  extends BaseService<
    LightningTalk & { exhibit: Exhibit },
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
  async findById(
    id: string,
  ): Promise<(LightningTalk & { exhibit: Exhibit }) | null> {
    return this.repository.findById(id, {
      exhibit: {
        include: { members: true, event: true },
      },
    });
  }

  async create(
    data: LightningTalkCreateDTO,
  ): Promise<LightningTalk & { exhibit: Exhibit }> {
    // 展示の存在確認
    const exhibit = await this.exhibitRepository.findById(data.exhibitId);
    if (!exhibit) {
      throw new Error("Exhibit not found");
    }

    // すでにLTとして登録されていないか確認
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
  ): Promise<LightningTalk & { exhibit: Exhibit }> {
    // LTの存在確認
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

  async delete(id: string): Promise<LightningTalk & { exhibit: Exhibit }> {
    // LTの存在確認
    const lightningTalk = await this.repository.findById(id);
    if (!lightningTalk) {
      throw new Error("Lightning talk not found");
    }

    return this.repository.delete(id);
  }

  async findMany(): Promise<(LightningTalk & { exhibit: Exhibit })[]> {
    return this.repository.findMany();
  }

  async findByEventId(
    eventId: string,
  ): Promise<(LightningTalk & { exhibit: Exhibit })[]> {
    return this.repository.findByEventId(eventId, {
      exhibit: {
        include: { members: true, event: true },
      },
    });
  }
}
