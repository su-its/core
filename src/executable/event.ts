import * as eventUsecases from "../application/usecase/event";
import { PrismaEventRepository } from "../infrastructure";

export type EventUseCases = {
	createEvent: eventUsecases.CreateEvent;
	updateEvent: eventUsecases.UpdateEvent;
	deleteEvent: eventUsecases.DeleteEvent;
	getEvent: eventUsecases.GetEvent;
	getEventList: eventUsecases.GetEventList;
	addExhibitToEvent: eventUsecases.AddExhibitToEvent;
	changeExhibitDescription: eventUsecases.ChangeExhibitDescription;
	changeExhibitMarkdownContent: eventUsecases.ChangeExhibitMarkdownContent;
	changeExhibitName: eventUsecases.ChangeExhibitName;
	changeExhibitUrl: eventUsecases.ChangeExhibitUrl;
	changeLightningTalkDuration: eventUsecases.ChangeLightningTalkDuration;
	changeLightningTalkSlideUrl: eventUsecases.ChangeLightningTalkSlideUrl;
	changeLightningTalkStartTime: eventUsecases.ChangeLightningTalkStartTime;
	removeExhibitFromEvent: eventUsecases.RemoveExhibitFromEvent;
};

/**
 * @beta 将来的にAPIが変更される可能性があります。
 */
export function createEventUseCases(): EventUseCases {
	const eventRepo = new PrismaEventRepository();

	return {
		createEvent: new eventUsecases.CreateEvent(eventRepo),
		updateEvent: new eventUsecases.UpdateEvent(eventRepo),
		deleteEvent: new eventUsecases.DeleteEvent(eventRepo),
		getEvent: new eventUsecases.GetEvent(eventRepo),
		getEventList: new eventUsecases.GetEventList(eventRepo),
		addExhibitToEvent: new eventUsecases.AddExhibitToEvent(eventRepo),
		changeExhibitDescription: new eventUsecases.ChangeExhibitDescription(
			eventRepo,
		),
		changeExhibitMarkdownContent:
			new eventUsecases.ChangeExhibitMarkdownContent(eventRepo),
		changeExhibitName: new eventUsecases.ChangeExhibitName(eventRepo),
		changeExhibitUrl: new eventUsecases.ChangeExhibitUrl(eventRepo),
		changeLightningTalkDuration: new eventUsecases.ChangeLightningTalkDuration(
			eventRepo,
		),
		changeLightningTalkSlideUrl: new eventUsecases.ChangeLightningTalkSlideUrl(
			eventRepo,
		),
		changeLightningTalkStartTime:
			new eventUsecases.ChangeLightningTalkStartTime(eventRepo),
		removeExhibitFromEvent: new eventUsecases.RemoveExhibitFromEvent(eventRepo),
	};
}
