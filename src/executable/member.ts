import {
	ChangeDiscordNickNameUseCase,
	ConnectDiscordAccountUseCase,
	GetMemberByDiscordIdUseCase,
	GetMemberByEmailUseCase,
	GetMemberListUseCase,
	GetMemberUseCase,
	RegisterMemberUseCase,
	UpdateMemberUseCase,
} from "#application";
import { DrizzleDiscordAccountRepository, DrizzleMemberRepository } from "#infrastructure";

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
	const memberRepo = new DrizzleMemberRepository();
	const discordRepo = new DrizzleDiscordAccountRepository();

	return {
		registerMember: new RegisterMemberUseCase(memberRepo),
		updateMember: new UpdateMemberUseCase(memberRepo),
		getMember: new GetMemberUseCase(memberRepo),
		getMemberByEmail: new GetMemberByEmailUseCase(memberRepo),
		getMemberByDiscordId: new GetMemberByDiscordIdUseCase(discordRepo, memberRepo),
		getMemberList: new GetMemberListUseCase(memberRepo),
		changeDiscordNickName: new ChangeDiscordNickNameUseCase(discordRepo),
		connectDiscordAccount: new ConnectDiscordAccountUseCase(memberRepo, discordRepo),
	};
}
