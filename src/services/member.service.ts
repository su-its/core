import type { Member, Prisma } from "@prisma/client";
import type { IDiscordAccountRepository } from "../repositories/interfaces/discordAccount.repository.interface";
import type { IMemberRepository } from "../repositories/interfaces/member.repository.interface";
import { BaseService } from "./base.service";
import type {
  IMemberService,
  MemberCreateDTO,
  MemberUpdateDTO,
} from "./interfaces/member.service.interface";

export class MemberService
  extends BaseService<
    Member,
    MemberCreateDTO,
    MemberUpdateDTO,
    Prisma.MemberFindManyArgs,
    Prisma.MemberCreateInput,
    Prisma.MemberUpdateInput,
    IMemberRepository
  >
  implements IMemberService
{
  constructor(
    memberRepository: IMemberRepository,
    private readonly discordAccountRepository: IDiscordAccountRepository,
  ) {
    super(memberRepository);
  }

  async create(data: MemberCreateDTO): Promise<Member> {
    // メールアドレスの重複チェック
    const existingMember = await this.repository.findByEmail(data.email);
    if (existingMember) {
      throw new Error("Email already exists");
    }

    return this.repository.create(data);
  }

  async update(id: string, data: MemberUpdateDTO): Promise<Member> {
    if (data.email) {
      const existingMember = await this.repository.findByEmail(data.email);
      if (existingMember && existingMember.id !== id) {
        throw new Error("Email already exists");
      }
    }

    return this.repository.update(id, data);
  }

  async findByEmail(email: string): Promise<Member | null> {
    return this.repository.findByEmail(email);
  }

  async findByStudentId(studentId: string): Promise<Member[]> {
    return this.repository.findByStudentId(studentId);
  }

  async addDiscordAccount(
    memberId: string,
    discordId: string,
    nickName: string,
  ): Promise<Member> {
    // メンバーの存在確認
    const member = await this.repository.findById(memberId);
    if (!member) {
      throw new Error("Member not found");
    }

    // Discord IDの重複チェック
    const existingAccount =
      await this.discordAccountRepository.findById(discordId);
    if (existingAccount) {
      throw new Error("Discord account already exists");
    }

    await this.discordAccountRepository.create({
      id: discordId,
      nickName,
      member: { connect: { id: member.id } },
    });

    return this.repository.findById(memberId) as Promise<Member>;
  }
}
