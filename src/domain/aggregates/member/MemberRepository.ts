import type { Member } from "./Member";
import type { MemberId } from "./MemberId";
import type { UniversityEmail } from "./UniversityEmail";

export interface MemberRepository {
	findById(id: MemberId): Promise<Member | null>;
	findByEmail(email: UniversityEmail): Promise<Member | null>;
	findAll(): Promise<Member[]>;
	save(member: Member): Promise<void>;
}
