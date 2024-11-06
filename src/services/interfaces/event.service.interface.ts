import type { Event } from "@prisma/client";
import type { IBaseService } from "./base.service.interface";

export interface EventCreateDTO {
  name: string;
  date: Date;
}

export interface EventUpdateDTO extends Partial<EventCreateDTO> {}

export interface IEventService
  extends IBaseService<Event, EventCreateDTO, EventUpdateDTO> {
  findUpcoming(limit?: number): Promise<Event[]>;
  findWithMembers(id: string): Promise<Event | null>;
  findWithExhibits(id: string): Promise<Event | null>;
  registerMember(eventId: string, memberId: string): Promise<void>;
  unregisterMember(eventId: string, memberId: string): Promise<void>;
}
