import type { DiscordAccount, Prisma } from "@prisma/client";
import type { IDiscordAccountRepository } from "../repositories/interfaces/discordAccount.repository.interface";
import type { IMemberRepository } from "../repositories/interfaces/member.repository.interface";
import { BaseService } from "./base.service";
import type {
  DiscordAccountCreateDTO,
  DiscordAccountUpdateDTO,
  IDiscordAccountService,
} from "./interfaces/discordAccount.service.interface";

export class DiscordAccountService
  extends BaseService<
    DiscordAccount,
    DiscordAccountCreateDTO,
    DiscordAccountUpdateDTO,
    Prisma.DiscordAccountFindManyArgs,
    Prisma.DiscordAccountCreateInput,
    Prisma.DiscordAccountUpdateInput,
    IDiscordAccountRepository
  >
  implements IDiscordAccountService
{
  constructor(
    discordAccountRepository: IDiscordAccountRepository,
    private readonly memberRepository: IMemberRepository,
  ) {
    super(discordAccountRepository);
  }

  async create(data: DiscordAccountCreateDTO): Promise<DiscordAccount> {
    // メンバーの存在確認
    const member = await this.memberRepository.findById(data.memberId);
    if (!member) {
      throw new Error("Member not found");
    }

    // Discord IDの重複チェック
    const existingAccount = await this.repository.findById(data.id);
    if (existingAccount) {
      throw new Error("Discord account already exists");
    }

    return this.repository.create({
      id: data.id,
      nickName: data.nickName,
      member: { connect: { id: data.memberId } },
    });
  }

  async update(
    id: string,
    data: DiscordAccountUpdateDTO,
  ): Promise<DiscordAccount> {
    // 既存アカウントの確認
    const existingAccount = await this.repository.findById(id);
    if (!existingAccount) {
      throw new Error("Discord account not found");
    }

    // メンバーIDが変更される場合、メンバーの存在確認
    if (data.memberId) {
      const member = await this.memberRepository.findById(data.memberId);
      if (!member) {
        throw new Error("Member not found");
      }
    }

    return this.repository.update(id, {
      nickName: data.nickName,
      member: { connect: { id: data.memberId } },
    });
  }

  async findByMemberId(memberId: string): Promise<DiscordAccount[]> {
    // メンバーの存在確認
    const member = await this.memberRepository.findById(memberId);
    if (!member) {
      throw new Error("Member not found");
    }

    return this.repository.findByMemberId(memberId);
  }
}
