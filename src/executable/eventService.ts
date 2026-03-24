import * as eventUsecases from "#application";
import * as eventParticipationUsecases from "#application";
import type { Event } from "#domain/aggregates/event/Event";
import { eventId } from "#domain/aggregates/event/EventId";
import type { EventRepository } from "#domain/aggregates/event/EventRepository";
import type { Exhibit } from "#domain/aggregates/event/Exhibit";
import { exhibitId } from "#domain/aggregates/event/ExhibitId";
import { LightningTalkDuration } from "#domain/aggregates/event/LightningTalkDuration";
import { Url } from "#domain/aggregates/event/Url";
import type { Member } from "#domain/aggregates/member/Member";
import { memberId } from "#domain/aggregates/member/MemberId";
import type { MemberRepository } from "#domain/aggregates/member/MemberRepository";
import { DrizzleEventRepository, DrizzleMemberRepository } from "#infrastructure";

export type EventService = {
	create(input: { id: string; name: string; date: Date }): Promise<{ event: Event }>;

	update(input: { eventId: string; name?: string; date?: Date }): Promise<{ event: Event }>;

	delete(eventId: string): Promise<{ event: Event }>;

	getById(eventId: string): Promise<{ event: Event | null }>;

	list(): Promise<{ events: Event[] }>;

	addExhibit(input: {
		eventId: string;
		exhibit: {
			id: string;
			name: string;
			description?: string;
			markdownContent?: string;
			url?: string;
		};
	}): Promise<{ event: Event }>;

	removeExhibit(input: { eventId: string; exhibitId: string }): Promise<{ event: Event }>;

	changeExhibitName(input: {
		eventId: string;
		exhibitId: string;
		newName: string;
	}): Promise<{ event: Event }>;

	changeExhibitDescription(input: {
		eventId: string;
		exhibitId: string;
		newDescription: string;
	}): Promise<{ event: Event }>;

	changeExhibitMarkdownContent(input: {
		eventId: string;
		exhibitId: string;
		newMarkdownContent: string;
	}): Promise<{ event: Event }>;

	changeExhibitUrl(input: {
		eventId: string;
		exhibitId: string;
		newUrl: string;
	}): Promise<{ event: Event }>;

	changeLightningTalkDuration(input: {
		eventId: string;
		exhibitId: string;
		newDuration: number;
	}): Promise<{ event: Event }>;

	changeLightningTalkSlideUrl(input: {
		eventId: string;
		exhibitId: string;
		newSlideUrl: string;
	}): Promise<{ event: Event }>;

	changeLightningTalkStartTime(input: {
		eventId: string;
		exhibitId: string;
		newStartTime: Date;
	}): Promise<{ event: Event }>;

	registerMemberToEvent(input: { memberId: string; eventId: string }): Promise<{ event: Event }>;

	removeMemberFromEvent(input: { memberId: string; eventId: string }): Promise<{ event: Event }>;

	getEventsByMember(memberIdValue: string): Promise<{ events: Event[] }>;

	getMembersByEvent(eventIdValue: string): Promise<{ members: Member[] }>;

	registerMemberToExhibit(input: {
		memberId: string;
		exhibitId: string;
	}): Promise<{ event: Event }>;

	removeMemberFromExhibit(input: {
		memberId: string;
		exhibitId: string;
	}): Promise<{ event: Event }>;

	getExhibitsByMember(memberIdValue: string): Promise<{ exhibits: Exhibit[] }>;

	getMembersByExhibit(exhibitIdValue: string): Promise<{ members: Member[] }>;
};

export type EventServiceDeps = {
	eventRepository?: EventRepository;
	memberRepository?: MemberRepository;
};

export function createEventService(deps?: EventServiceDeps): EventService {
	const eventRepo = deps?.eventRepository ?? new DrizzleEventRepository();
	const memberRepo = deps?.memberRepository ?? new DrizzleMemberRepository();

	const createEvent = new eventUsecases.CreateEvent(eventRepo);
	const updateEvent = new eventUsecases.UpdateEvent(eventRepo);
	const deleteEvent = new eventUsecases.DeleteEvent(eventRepo);
	const getEvent = new eventUsecases.GetEvent(eventRepo);
	const getEventList = new eventUsecases.GetEventList(eventRepo);
	const addExhibitToEvent = new eventUsecases.AddExhibitToEvent(eventRepo);
	const removeExhibitFromEvent = new eventUsecases.RemoveExhibitFromEvent(eventRepo);
	const changeExhibitName = new eventUsecases.ChangeExhibitName(eventRepo);
	const changeExhibitDescription = new eventUsecases.ChangeExhibitDescription(eventRepo);
	const changeExhibitMarkdownContent = new eventUsecases.ChangeExhibitMarkdownContent(eventRepo);
	const changeExhibitUrl = new eventUsecases.ChangeExhibitUrl(eventRepo);
	const changeLTDuration = new eventUsecases.ChangeLightningTalkDuration(eventRepo);
	const changeLTSlideUrl = new eventUsecases.ChangeLightningTalkSlideUrl(eventRepo);
	const changeLTStartTime = new eventUsecases.ChangeLightningTalkStartTime(eventRepo);
	const registerMemberToEvent = new eventParticipationUsecases.RegisterMemberToEvent(
		eventRepo,
		memberRepo,
	);
	const removeMemberFromEvent = new eventParticipationUsecases.RemoveMemberFromEvent(
		eventRepo,
		memberRepo,
	);
	const getEventsByMember = new eventParticipationUsecases.GetEventsByMember(eventRepo);
	const getMembersByEvent = new eventParticipationUsecases.GetMembersByEvent(eventRepo, memberRepo);
	const registerMemberToExhibit = new eventParticipationUsecases.RegisterMemberToExhibit(
		eventRepo,
		memberRepo,
	);
	const removeMemberFromExhibit = new eventParticipationUsecases.RemoveMemberFromExhibit(
		memberRepo,
		eventRepo,
	);
	const getExhibitsByMember = new eventParticipationUsecases.GetExhibitsByMember(eventRepo);
	const getMembersByExhibit = new eventParticipationUsecases.GetMembersByExhibit(
		memberRepo,
		eventRepo,
	);

	return {
		create: (input) =>
			createEvent.execute({
				id: eventId(input.id),
				name: input.name,
				date: input.date,
			}),

		update: (input) =>
			updateEvent.execute({
				eventId: eventId(input.eventId),
				name: input.name,
				date: input.date,
			}),

		delete: (id) => deleteEvent.execute({ eventId: eventId(id) }),

		getById: (id) => getEvent.execute({ eventId: eventId(id) }),

		list: () => getEventList.execute({} as Record<string, never>),

		addExhibit: (input) =>
			addExhibitToEvent.execute({
				eventId: eventId(input.eventId),
				exhibit: {
					id: exhibitId(input.exhibit.id),
					name: input.exhibit.name,
					description: input.exhibit.description,
					markdownContent: input.exhibit.markdownContent,
					url: input.exhibit.url ? new Url(input.exhibit.url) : undefined,
				},
			}),

		removeExhibit: (input) =>
			removeExhibitFromEvent.execute({
				eventId: eventId(input.eventId),
				exhibitId: exhibitId(input.exhibitId),
			}),

		changeExhibitName: (input) =>
			changeExhibitName.execute({
				eventId: eventId(input.eventId),
				exhibitId: exhibitId(input.exhibitId),
				newName: input.newName,
			}),

		changeExhibitDescription: (input) =>
			changeExhibitDescription.execute({
				eventId: eventId(input.eventId),
				exhibitId: exhibitId(input.exhibitId),
				newDescription: input.newDescription,
			}),

		changeExhibitMarkdownContent: (input) =>
			changeExhibitMarkdownContent.execute({
				eventId: eventId(input.eventId),
				exhibitId: exhibitId(input.exhibitId),
				newMarkdownContent: input.newMarkdownContent,
			}),

		changeExhibitUrl: (input) =>
			changeExhibitUrl.execute({
				eventId: eventId(input.eventId),
				exhibitId: exhibitId(input.exhibitId),
				newUrl: new Url(input.newUrl),
			}),

		changeLightningTalkDuration: (input) =>
			changeLTDuration.execute({
				eventId: eventId(input.eventId),
				exhibitId: exhibitId(input.exhibitId),
				newDuration: new LightningTalkDuration(input.newDuration),
			}),

		changeLightningTalkSlideUrl: (input) =>
			changeLTSlideUrl.execute({
				eventId: eventId(input.eventId),
				exhibitId: exhibitId(input.exhibitId),
				newSlideUrl: new Url(input.newSlideUrl),
			}),

		changeLightningTalkStartTime: (input) =>
			changeLTStartTime.execute({
				eventId: eventId(input.eventId),
				exhibitId: exhibitId(input.exhibitId),
				newStartTime: input.newStartTime,
			}),

		registerMemberToEvent: (input) =>
			registerMemberToEvent.execute({
				memberId: memberId(input.memberId),
				eventId: eventId(input.eventId),
			}),

		removeMemberFromEvent: (input) =>
			removeMemberFromEvent.execute({
				memberId: memberId(input.memberId),
				eventId: eventId(input.eventId),
			}),

		getEventsByMember: (id) => getEventsByMember.execute({ memberId: memberId(id) }),

		getMembersByEvent: (id) => getMembersByEvent.execute({ eventId: eventId(id) }),

		registerMemberToExhibit: (input) =>
			registerMemberToExhibit.execute({
				memberId: memberId(input.memberId),
				exhibitId: exhibitId(input.exhibitId),
			}),

		removeMemberFromExhibit: (input) =>
			removeMemberFromExhibit.execute({
				memberId: memberId(input.memberId),
				exhibitId: exhibitId(input.exhibitId),
			}),

		getExhibitsByMember: (id) => getExhibitsByMember.execute({ memberId: memberId(id) }),

		getMembersByExhibit: (id) => getMembersByExhibit.execute({ exhibitId: exhibitId(id) }),
	};
}
