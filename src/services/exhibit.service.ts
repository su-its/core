import type { Exhibit, Prisma } from "@prisma/client";
import type { IEventRepository } from "../repositories/interfaces/event.repository.interface";
import type { IExhibitRepository } from "../repositories/interfaces/exhibit.repository.interface";
import type { IMemberRepository } from "../repositories/interfaces/member.repository.interface";
import type { IMemberExhibitRepository } from "../repositories/interfaces/memberExhibit.repository.interface";
import { BaseService } from "./base.service";
import type {
  ExhibitCreateDTO,
  ExhibitUpdateDTO,
  IExhibitService,
} from "./interfaces/exhibit.service.interface";

export class ExhibitService
  extends BaseService<
    Exhibit,
    ExhibitCreateDTO,
    ExhibitUpdateDTO,
    Prisma.ExhibitFindManyArgs,
    Prisma.ExhibitCreateInput,
    Prisma.ExhibitUpdateInput,
    IExhibitRepository
  >
  implements IExhibitService
{
  constructor(
    exhibitRepository: IExhibitRepository,
    private readonly eventRepository: IEventRepository,
    private readonly memberRepository: IMemberRepository,
    private readonly memberExhibitRepository: IMemberExhibitRepository,
  ) {
    super(exhibitRepository);
  }

  async create(data: ExhibitCreateDTO): Promise<Exhibit> {
    // イベントの存在確認
    const event = await this.eventRepository.findById(data.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    // URLの形式チェック（もし提供されている場合）
    if (data.url) {
      try {
        new URL(data.url);
      } catch {
        throw new Error("Invalid URL format");
      }
    }

    return this.repository.create({
      name: data.name,
      description: data.description,
      url: data.url,
      event: { connect: { id: data.eventId } },
    });
  }

  async update(id: string, data: ExhibitUpdateDTO): Promise<Exhibit> {
    // 展示の存在確認
    const existingExhibit = await this.repository.findById(id);
    if (!existingExhibit) {
      throw new Error("Exhibit not found");
    }

    // イベントIDが変更される場合、イベントの存在確認
    if (data.eventId) {
      const event = await this.eventRepository.findById(data.eventId);
      if (!event) {
        throw new Error("Event not found");
      }
    }

    // URLの形式チェック（もし更新される場合）
    if (data.url) {
      try {
        new URL(data.url);
      } catch {
        throw new Error("Invalid URL format");
      }
    }

    return this.repository.update(id, data);
  }

  async findByEventId(eventId: string): Promise<Exhibit[]> {
    // イベントの存在確認
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    return this.repository.findByEventId(eventId);
  }

  async findWithMembers(id: string): Promise<Exhibit | null> {
    const exhibit = await this.repository.findWithMembers(id);
    if (!exhibit) {
      throw new Error("Exhibit not found");
    }
    return exhibit;
  }

  async registerMember(exhibitId: string, memberId: string): Promise<void> {
    // 展示の存在確認
    const exhibit = await this.repository.findById(exhibitId);
    if (!exhibit) {
      throw new Error("Exhibit not found");
    }

    // メンバーの存在確認
    const member = await this.memberRepository.findById(memberId);
    if (!member) {
      throw new Error("Member not found");
    }

    // 既に登録済みかチェック
    const existingRegistration = await this.memberExhibitRepository.findMany({
      where: {
        exhibitId,
        memberId,
      },
    });

    if (existingRegistration.length > 0) {
      throw new Error("Member already registered to this exhibit");
    }

    // イベントへの参加確認も追加するかもしれない
    // TODO: 確認
    // const event = await this.eventRepository.findById(exhibit.eventId)
    // const isMemberRegisteredToEvent = ...

    await this.memberExhibitRepository.create({
      exhibit: { connect: { id: exhibitId } },
      member: { connect: { id: memberId } },
    });
  }

  async unregisterMember(exhibitId: string, memberId: string): Promise<void> {
    // 登録の存在確認
    const registration = await this.memberExhibitRepository.findMany({
      where: {
        exhibitId,
        memberId,
      },
    });

    if (registration.length === 0) {
      throw new Error("Member is not registered to this exhibit");
    }

    await this.memberExhibitRepository.delete(registration[0].id);
  }
}
