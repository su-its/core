import { PrismaMemberRepository } from "@/infrastructure/prisma/PrismaMemberRepository";
import {
	ChangeDiscordNickNameUseCase,
	ConnectDiscordAccountUseCase,
	GetMemberUseCase,
	GetMemberByEmailUseCase,
	GetMemberListUseCase,
	RegisterMemberUseCase, // Note: Typo in original class name
	UpdateMemberUseCase,
} from "@/application/usecase";

export function createMemberUseCases() {
	const memberRepo = new PrismaMemberRepository();

	return {
		registerMember: new RegisterMemberUseCase(memberRepo),
		updateMember: new UpdateMemberUseCase(memberRepo),
		getMember: new GetMemberUseCase(memberRepo),
		getMemberByEmail: new GetMemberByEmailUseCase(memberRepo),
		getMemberList: new GetMemberListUseCase(memberRepo),
		changeDiscordNickName: new ChangeDiscordNickNameUseCase(memberRepo),
		connectDiscordAccount: new ConnectDiscordAccountUseCase(memberRepo),
	};
}

export type MemberUseCases = ReturnType<typeof createMemberUseCases>;
