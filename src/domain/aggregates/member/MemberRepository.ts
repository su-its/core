import type { Member } from "./Member";
import type { MemberId } from "./MemberId";

export interface MemberRepository {
	findById(id: MemberId): Promise<Member | null>;
	findByEmail(email: string): Promise<Member | null>;
	findByDiscordAccountId(discordAccountId: string): Promise<Member | null>;
	findAll(): Promise<Member[]>;
	save(member: Member): Promise<void>;
	delete(memberId: MemberId): Promise<void>;
}
