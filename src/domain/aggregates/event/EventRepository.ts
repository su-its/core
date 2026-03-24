import type { MemberId } from "#domain/aggregates/member/MemberId";
import type { Event } from "./Event";
import type { EventId } from "./EventId";
import type { ExhibitId } from "./ExhibitId";

export interface EventRepository {
	findById(id: EventId): Promise<Event | null>;
	findByParticipantMemberId(memberId: MemberId): Promise<Event[]>;
	findByExhibitId(exhibitId: ExhibitId): Promise<Event | null>;
	findAll(): Promise<Event[]>;
	save(event: Event): Promise<void>;
	delete(eventId: EventId): Promise<void>;
}
