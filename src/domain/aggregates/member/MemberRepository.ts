import type { Member } from "./Member";

export interface MemberRepository {
	findByEmail(email: string): Promise<Member | null>;
	findAll(): Promise<Member[]>;
	save(member: Member): Promise<void>;
}
