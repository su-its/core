// lightningTalk.service.interface.ts
import type { Prisma } from "@prisma/client";
import type { IBaseService } from "./base.service.interface";

export type DefaultInclude = { exhibit: true };
export type ExhibitInclude = {
  exhibit: {
    include: {
      event: true;
      members: {
        include: {
          member: true;
        };
      };
    };
  };
};

export type LightningTalkWithExhibit = Prisma.LightningTalkGetPayload<{
  include: DefaultInclude;
}>;

export type LightningTalkWithAll = Prisma.LightningTalkGetPayload<{
  include: ExhibitInclude;
}>;

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
    LightningTalkWithExhibit,
    LightningTalkCreateDTO,
    LightningTalkUpdateDTO
  > {
  findById(id: string): Promise<LightningTalkWithAll | null>;
  create(data: LightningTalkCreateDTO): Promise<LightningTalkWithExhibit>;
  update(
    id: string,
    data: LightningTalkUpdateDTO,
  ): Promise<LightningTalkWithExhibit>;
  delete(id: string): Promise<LightningTalkWithExhibit>;
  findMany(): Promise<LightningTalkWithExhibit[]>;
  findByEventId(eventId: string): Promise<LightningTalkWithAll[]>;
}
