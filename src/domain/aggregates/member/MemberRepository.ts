import type { Member } from "./Member";

export interface MemberRepository {
	findById(id: string): Promise<Member | null>;
	findByEmail(email: string): Promise<Member | null>;
	findByDiscordAccountId(discordAccountId: string): Promise<Member | null>;
	findAll(): Promise<Member[]>;
	save(member: Member): Promise<void>;
	delete(memberId: string): Promise<void>;
}
