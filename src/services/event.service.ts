import type { Event, Prisma } from "@prisma/client";
import type { IEventRepository } from "../repositories/interfaces/event.repository.interface";
import type { IMemberRepository } from "../repositories/interfaces/member.repository.interface";
import type { IMemberEventRepository } from "../repositories/interfaces/memberEvent.repository.interface";
import { BaseService } from "./base.service";
import type {
  EventCreateDTO,
  EventUpdateDTO,
  IEventService,
} from "./interfaces/event.service.interface";

export class EventService
  extends BaseService<
    Event,
    EventCreateDTO,
    EventUpdateDTO,
    Prisma.EventFindManyArgs,
    Prisma.EventCreateInput,
    Prisma.EventUpdateInput,
    IEventRepository
  >
  implements IEventService
{
  constructor(
    eventRepository: IEventRepository,
    private readonly memberRepository: IMemberRepository,
    private readonly memberEventRepository: IMemberEventRepository,
  ) {
    super(eventRepository);
  }

  async create(data: EventCreateDTO): Promise<Event> {
    // 日付の検証
    if (data.date < new Date()) {
      throw new Error("Event date cannot be in the past");
    }

    return this.repository.create({
      name: data.name,
      date: data.date,
    });
  }

  async update(id: string, data: EventUpdateDTO): Promise<Event> {
    // イベントの存在確認
    const existingEvent = await this.repository.findById(id);
    if (!existingEvent) {
      throw new Error("Event not found");
    }

    // 日付の検証（日付が更新される場合）
    if (data.date && data.date < new Date()) {
      throw new Error("Event date cannot be in the past");
    }

    return this.repository.update(id, data);
  }

  async findUpcoming(limit?: number): Promise<Event[]> {
    return this.repository.findUpcoming(limit);
  }

  async findWithMembers(id: string): Promise<Event | null> {
    const event = await this.repository.findWithMembers(id);
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  }

  async findWithExhibits(id: string): Promise<Event | null> {
    const event = await this.repository.findWithExhibits(id);
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  }

  async findByName(name: string): Promise<Event[]> {
    return await this.repository.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async registerMember(eventId: string, memberId: string): Promise<void> {
    // イベントの存在確認
    const event = await this.repository.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    // メンバーの存在確認
    const member = await this.memberRepository.findById(memberId);
    if (!member) {
      throw new Error("Member not found");
    }

    // 既に登録済みかチェック
    const existingRegistration = await this.memberEventRepository.findMany({
      where: {
        eventId,
        memberId,
      },
    });

    if (existingRegistration.length > 0) {
      throw new Error("Member already registered to this event");
    }

    await this.memberEventRepository.create({
      event: { connect: { id: eventId } },
      member: { connect: { id: memberId } },
    });
  }

  async unregisterMember(eventId: string, memberId: string): Promise<void> {
    // 登録の存在確認
    const registration = await this.memberEventRepository.findMany({
      where: {
        eventId,
        memberId,
      },
    });

    if (registration.length === 0) {
      throw new Error("Member is not registered to this event");
    }

    await this.memberEventRepository.delete(registration[0].id);
  }
}
