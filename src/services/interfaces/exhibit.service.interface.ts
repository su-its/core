import type { Exhibit } from "@prisma/client";
import type { IBaseService } from "./base.service.interface";

export interface ExhibitCreateDTO {
  name: string;
  description?: string;
  url?: string;
  eventId: string;
}

export interface ExhibitUpdateDTO extends Partial<ExhibitCreateDTO> {}

export interface IExhibitService
  extends IBaseService<Exhibit, ExhibitCreateDTO, ExhibitUpdateDTO> {
  findByEventId(eventId: string): Promise<Exhibit[]>;
  findWithMembers(id: string): Promise<Exhibit | null>;
  registerMember(exhibitId: string, memberId: string): Promise<void>;
  unregisterMember(exhibitId: string, memberId: string): Promise<void>;
}
