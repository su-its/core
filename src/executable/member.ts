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
import { PrismaMemberRepository } from "../infrastructure/";

export type MemberUseCases = {
	registerMember: RegisterMemberUseCase;
	updateMember: UpdateMemberUseCase;
	getMember: GetMemberUseCase;
	getMemberByEmail: GetMemberByEmailUseCase;
	getMemberByDiscordId: GetMemberByDiscordIdUseCase;
	getMemberList: GetMemberListUseCase;
	changeDiscordNickName: ChangeDiscordNickNameUseCase;
	connectDiscordAccount: ConnectDiscordAccountUseCase;
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
