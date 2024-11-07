import type { Member } from "@prisma/client";
import type { IBaseService } from "./base.service.interface";

export interface MemberCreateDTO {
  name: string;
  studentId: string;
  department: string;
  email: string;
  personalEmail?: string;
}

export interface MemberUpdateDTO extends Partial<MemberCreateDTO> {}

export interface IMemberService
  extends IBaseService<Member, MemberCreateDTO, MemberUpdateDTO> {
  findByEmail(email: string): Promise<Member | null>;
  findByStudentId(studentId: string): Promise<Member[]>;
  findByName(name: string): Promise<Member[]>;
  addDiscordAccount(
    memberId: string,
    discordId: string,
    nickName: string,
  ): Promise<Member>;
}
