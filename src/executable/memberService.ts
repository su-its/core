import {
	ChangeDiscordNickNameUseCase,
	ConnectDiscordAccountUseCase,
	GetMemberByDiscordIdUseCase,
	GetMemberByEmailUseCase,
	GetMemberListUseCase,
	GetMemberUseCase,
	GetMemberWithDiscordAccountsUseCase,
	ListMembersWithDiscordAccountsUseCase,
	type MemberWithDiscordAccounts,
	RegisterMemberUseCase,
	UpdateMemberUseCase,
} from "#application";
import { discordId } from "#domain/aggregates/discord-account/DiscordId";
import type { DiscordAccountRepository } from "#domain/aggregates/discord-account/DiscordAccountRepository";
import type { DiscordAccount } from "#domain/aggregates/discord-account/DiscordAccount";
import { Email } from "#domain/aggregates/member/Email";
import type { Member } from "#domain/aggregates/member/Member";
import { memberId } from "#domain/aggregates/member/MemberId";
import type { MemberRepository } from "#domain/aggregates/member/MemberRepository";
import { UniversityEmail } from "#domain/aggregates/member/UniversityEmail";
import type { CompleteAffiliation } from "#domain/shared/affiliation/Affiliation";
import { recorded, notRecorded } from "#domain/shared/Recorded";
import { StudentId } from "#domain/shared/StudentId";
import { DrizzleDiscordAccountRepository, DrizzleMemberRepository } from "#infrastructure";

export type { MemberWithDiscordAccounts } from "#application";

export type MemberService = {
	register(input: {
		name: string;
		studentId: string;
		email: string;
		personalEmail?: string;
		affiliation: CompleteAffiliation;
	}): Promise<{ member: Member }>;

	update(input: {
		memberId: string;
		name?: string;
		studentId?: string;
		personalEmail?: string | null;
	}): Promise<{ member: Member }>;

	getById(id: string): Promise<{ member: Member | null }>;

	getByEmail(email: string): Promise<{ member: Member | null }>;

	getByDiscordId(discordId: string): Promise<{ member: Member | null }>;

	list(): Promise<{ members: Member[] }>;

	getMemberWithDiscordAccounts(id: string): Promise<{
		member: MemberWithDiscordAccounts | null;
	}>;

	listMembersWithDiscordAccounts(): Promise<{
		entries: MemberWithDiscordAccounts[];
	}>;

	connectDiscordAccount(input: {
		memberId: string;
		discordAccountId: string;
		discordNickName?: string;
	}): Promise<{ discordAccount: DiscordAccount }>;

	changeDiscordNickName(input: {
		discordAccountId: string;
		discordNickName: string;
	}): Promise<{ discordAccount: DiscordAccount }>;
};

export type MemberServiceDeps = {
	memberRepository?: MemberRepository;
	discordAccountRepository?: DiscordAccountRepository;
};

export function createMemberService(deps?: MemberServiceDeps): MemberService {
	const memberRepo = deps?.memberRepository ?? new DrizzleMemberRepository();
	const discordRepo = deps?.discordAccountRepository ?? new DrizzleDiscordAccountRepository();

	const registerMember = new RegisterMemberUseCase(memberRepo);
	const updateMember = new UpdateMemberUseCase(memberRepo);
	const getMember = new GetMemberUseCase(memberRepo);
	const getMemberByEmail = new GetMemberByEmailUseCase(memberRepo);
	const getMemberByDiscordId = new GetMemberByDiscordIdUseCase(discordRepo, memberRepo);
	const getMemberList = new GetMemberListUseCase(memberRepo);
	const getMemberWithDiscord = new GetMemberWithDiscordAccountsUseCase(memberRepo, discordRepo);
	const listMembersWithDiscord = new ListMembersWithDiscordAccountsUseCase(memberRepo, discordRepo);
	const connectDiscordAccountUC = new ConnectDiscordAccountUseCase(memberRepo, discordRepo);
	const changeDiscordNickNameUC = new ChangeDiscordNickNameUseCase(discordRepo);

	return {
		register: (input) =>
			registerMember.execute({
				name: input.name,
				studentId: StudentId.fromString(input.studentId),
				email: new UniversityEmail(input.email),
				personalEmail:
					input.personalEmail !== undefined
						? recorded(new Email(input.personalEmail))
						: notRecorded(),
				affiliation: input.affiliation,
			}),

		update: (input) =>
			updateMember.execute({
				memberId: memberId(input.memberId),
				name: input.name,
				studentId: input.studentId ? StudentId.fromString(input.studentId) : undefined,
				personalEmail:
					input.personalEmail === null
						? notRecorded()
						: input.personalEmail !== undefined
							? recorded(new Email(input.personalEmail))
							: undefined,
			}),

		getById: (id) => getMember.execute({ id: memberId(id) }),

		getByEmail: (email) => getMemberByEmail.execute({ email: new UniversityEmail(email) }),

		getByDiscordId: (id) => getMemberByDiscordId.execute({ discordId: discordId(id) }),

		list: () => getMemberList.execute({} as Record<string, never>),

		getMemberWithDiscordAccounts: (id) =>
			getMemberWithDiscord.execute({ id: memberId(id) }),

		listMembersWithDiscordAccounts: () =>
			listMembersWithDiscord.execute({} as Record<string, never>),

		connectDiscordAccount: (input) =>
			connectDiscordAccountUC.execute({
				memberId: memberId(input.memberId),
				discordAccountId: discordId(input.discordAccountId),
				discordNickName: input.discordNickName,
			}),

		changeDiscordNickName: (input) =>
			changeDiscordNickNameUC.execute({
				discordAccountId: discordId(input.discordAccountId),
				discordNickName: input.discordNickName,
			}),
	};
}
