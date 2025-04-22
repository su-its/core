import type { Member, MemberRepository } from "../../domain";
import type { IUseCase } from "./BaseUseCase";

// 入力パラメータがない場合は空のオブジェクト型
export type GetMemberListInput = Record<string, never>;

export type GetMemberListOutput = Member[];

export class GetMemberListUseCase
	implements IUseCase<GetMemberListInput, GetMemberListOutput>
{
	constructor(private readonly memberRepo: MemberRepository) {}

	async execute(_input: GetMemberListInput): Promise<GetMemberListOutput> {
		return await this.memberRepo.findAll();
	}
}
