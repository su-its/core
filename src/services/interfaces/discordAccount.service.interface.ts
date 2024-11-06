import type { DiscordAccount } from "@prisma/client";
import type { IBaseService } from "./base.service.interface";

export interface DiscordAccountCreateDTO {
  id: string; // Discord ID
  nickName: string;
  memberId: string;
}

export interface DiscordAccountUpdateDTO {
  nickName?: string;
  memberId?: string;
}

export interface IDiscordAccountService
  extends IBaseService<
    DiscordAccount,
    DiscordAccountCreateDTO,
    DiscordAccountUpdateDTO
  > {
  findByMemberId(memberId: string): Promise<DiscordAccount[]>;
}
