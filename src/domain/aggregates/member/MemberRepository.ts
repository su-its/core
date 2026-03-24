import type { Member } from "./Member.ts";
import type { MemberId } from "./MemberId.ts";
import type { UniversityEmail } from "./UniversityEmail.ts";

export interface MemberRepository {
	findById(id: MemberId): Promise<Member | null>;
	findByEmail(email: UniversityEmail): Promise<Member | null>;
	findAll(): Promise<Member[]>;
	save(member: Member): Promise<void>;
}
