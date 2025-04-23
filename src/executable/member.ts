import { PrismaMemberRepository } from "@/infrastructure/prisma/PrismaMemberRepository";
import {
	ChangeDiscordNickNameUseCase,
	ConnectDiscordAccountUseCase,
	GetMemberByDiscordIdUseCase,
	GetMemberByEmailUseCase,
	GetMemberListUseCase,
	GetMemberUseCase,
	RegisterMemberUseCase,
	UpdateMemberUseCase,
} from "../application";
import type {
	ChangeDiscordNickNameInput,
	ChangeDiscordNickNameOutput,
	ConnectDiscordAccountInput,
	ConnectDiscordAccountOutput,
	GetMemberByDiscordIdInput,
	GetMemberByDiscordIdOutput,
	GetMemberByEmailInput,
	GetMemberByEmailOutput,
	GetMemberInput,
	GetMemberListInput,
	GetMemberListOutput,
	GetMemberOutput,
	IUseCase,
	RegisterMemberInput,
	RegisterMemberOutput,
	UpdateMemberInput,
	UpdateMemberOutput,
} from "../application";

export type MemberUseCases = {
	registerMember: IUseCase<RegisterMemberInput, RegisterMemberOutput>;
	updateMember: IUseCase<UpdateMemberInput, UpdateMemberOutput>;
	getMember: IUseCase<GetMemberInput, GetMemberOutput>;
	getMemberByEmail: IUseCase<GetMemberByEmailInput, GetMemberByEmailOutput>;
	getMemberByDiscordId: IUseCase<
		GetMemberByDiscordIdInput,
		GetMemberByDiscordIdOutput
	>;
	getMemberList: IUseCase<GetMemberListInput, GetMemberListOutput>;
	changeDiscordNickName: IUseCase<
		ChangeDiscordNickNameInput,
		ChangeDiscordNickNameOutput
	>;
	connectDiscordAccount: IUseCase<
		ConnectDiscordAccountInput,
		ConnectDiscordAccountOutput
	>;
};

export function createMemberUseCases(): MemberUseCases {
	const memberRepo = new PrismaMemberRepository();

	return {
		registerMember: new RegisterMemberUseCase(memberRepo),
		updateMember: new UpdateMemberUseCase(memberRepo),
		getMember: new GetMemberUseCase(memberRepo),
		getMemberByDiscordId: new GetMemberByDiscordIdUseCase(memberRepo),
		getMemberByEmail: new GetMemberByEmailUseCase(memberRepo),
		getMemberList: new GetMemberListUseCase(memberRepo),
		changeDiscordNickName: new ChangeDiscordNickNameUseCase(memberRepo),
		connectDiscordAccount: new ConnectDiscordAccountUseCase(memberRepo),
	};
}
