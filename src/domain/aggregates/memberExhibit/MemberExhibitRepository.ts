import type { MemberExhibit } from "./MemberExhibit";

export interface MemberExhibitRepository {
	findById(id: string): Promise<MemberExhibit | null>;
	findByMemberId(memberId: string): Promise<MemberExhibit[]>;
	findByExhibitId(exhibitId: string): Promise<MemberExhibit[]>;
	save(memberExhibit: MemberExhibit): Promise<void>;
	delete(id: string): Promise<void>;
}
