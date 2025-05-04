import type { MemberEvent } from "./MemberEvent";

export interface MemberEventRepository {
	findById(id: string): Promise<MemberEvent | null>;
	findByMemberId(memberId: string): Promise<MemberEvent[]>;
	findByEventId(eventId: string): Promise<MemberEvent[]>;
	save(memberEvent: MemberEvent): Promise<void>;
	delete(id: string): Promise<void>;
}
