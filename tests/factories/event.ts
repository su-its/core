import { randomUUID } from "node:crypto";
import { Event } from "#domain/aggregates/event/Event";

interface EventFactoryParams {
	id?: string;
	name?: string;
	date?: Date;
}

export function createEvent(params: EventFactoryParams = {}): Event {
	const id = params.id ?? randomUUID();
	const name = params.name ?? "テストイベント";
	const date = params.date ?? new Date("2025-04-01T10:00:00Z");

	return new Event(id, name, date);
}
