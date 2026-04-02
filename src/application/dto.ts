import type { CompleteAffiliation } from "#domain/shared/affiliation/Affiliation";
import type { DiscordAccount, Member } from "#domain";
import type { Email } from "#domain/aggregates/member/Email";
import type { Recorded } from "#domain/shared/Recorded";

type MemberDTOBase = {
	id: string;
	email: string;
	name: string;
	personalEmail: string | null;
};

export type MemberDTO =
	| (MemberDTOBase & {
			status: "active";
			studentId: string;
			affiliation: CompleteAffiliation;
	  })
	| (MemberDTOBase & { status: "unconfirmed" })
	| (MemberDTOBase & { status: "former" });

export type DiscordAccountDTO = {
	discordId: string;
	memberId: string;
	nickName: string;
};

function personalEmailToString(personalEmail: Recorded<Email>): string | null {
	return personalEmail.type === "recorded" ? personalEmail.value.getValue() : null;
}

export function toMemberDTO(member: Member): MemberDTO {
	const base = {
		id: member.id as string,
		email: member.email.getValue(),
		name: member.name,
		personalEmail: personalEmailToString(member.personalEmail),
	};

	if (member.status === "active") {
		return {
			...base,
			status: member.status,
			studentId: member.studentId.getValue(),
			affiliation: member.affiliation,
		};
	}

	return {
		...base,
		status: member.status,
	};
}

export type MemberWithDiscordAccounts = MemberDTO & {
	discordAccounts: DiscordAccountDTO[];
};

export function toDiscordAccountDTO(account: DiscordAccount): DiscordAccountDTO {
	return {
		discordId: account.discordId as string,
		memberId: account.memberId as string,
		nickName: account.nickName,
	};
}
