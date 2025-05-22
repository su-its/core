import type { Event } from "./Event";

export interface EventRepository {
	findById(id: string): Promise<Event | null>;
	findByParticipantMemberId(memberId: string): Promise<Event[]>;
	findByExhibitId(exhibitId: string): Promise<Event>;
	findAll(): Promise<Event[]>;
	save(event: Event): Promise<void>;
	delete(eventId: string): Promise<void>;
}
