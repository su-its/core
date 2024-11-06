import type { Exhibit, LightningTalk } from "@prisma/client";
import type { IBaseService } from "./base.service.interface";

export interface LightningTalkCreateDTO {
  exhibitId: string;
  startTime: Date;
  duration: number;
  slideUrl?: string;
}

export interface LightningTalkUpdateDTO {
  startTime?: Date;
  duration?: number;
  slideUrl?: string;
}

export interface ILightningTalkService
  extends IBaseService<
    LightningTalk & { exhibit: Exhibit }, // 常にexhibitを含む
    LightningTalkCreateDTO,
    LightningTalkUpdateDTO
  > {
  findById(id: string): Promise<(LightningTalk & { exhibit: Exhibit }) | null>;
  create(
    data: LightningTalkCreateDTO,
  ): Promise<LightningTalk & { exhibit: Exhibit }>;
  update(
    id: string,
    data: LightningTalkUpdateDTO,
  ): Promise<LightningTalk & { exhibit: Exhibit }>;
  delete(id: string): Promise<LightningTalk & { exhibit: Exhibit }>;
  findMany(): Promise<(LightningTalk & { exhibit: Exhibit })[]>;
  findByEventId(
    eventId: string,
  ): Promise<(LightningTalk & { exhibit: Exhibit })[]>;
}
