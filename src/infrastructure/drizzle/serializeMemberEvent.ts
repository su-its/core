import type { MemberDomainEvent } from "#domain/aggregates/member/MemberEvent";
import type { Email } from "#domain/aggregates/member/Email";
import type { Recorded } from "#domain/shared/Recorded";
import type { SerializedMemberEventPayload } from "./schema";

function serializeRecorded(
	rec: Recorded<Email>,
): { type: "recorded"; value: string } | { type: "notRecorded" } {
	return rec.type === "recorded"
		? { type: "recorded", value: rec.value.getValue() }
		: { type: "notRecorded" };
}

export function serializeMemberEventPayload(
	event: MemberDomainEvent,
): SerializedMemberEventPayload {
	switch (event.eventName) {
		case "MemberRegistered":
			return {
				eventName: "MemberRegistered",
				name: event.name,
				personalEmail: serializeRecorded(event.personalEmail),
				studentId: event.studentId.getValue(),
				affiliation: event.affiliation,
			};
		case "MemberDeregistered":
			return { eventName: "MemberDeregistered", reason: event.reason };
		case "MemberReregistered":
			return {
				eventName: "MemberReregistered",
				studentId: event.studentId.getValue(),
				affiliation: event.affiliation,
			};
		case "MemberUnconfirmed":
			return { eventName: "MemberUnconfirmed" };
		case "MemberConfirmed":
			return {
				eventName: "MemberConfirmed",
				studentId: event.studentId.getValue(),
				affiliation: event.affiliation,
			};
		case "InternallyAdvanced":
			return {
				eventName: "InternallyAdvanced",
				previousAffiliation: event.previousAffiliation,
				newAffiliation: event.newAffiliation,
				previousStudentId: event.previousStudentId.getValue(),
				newStudentId: event.newStudentId.getValue(),
			};
		case "FacultyTransferred":
			return {
				eventName: "FacultyTransferred",
				previousAffiliation: event.previousAffiliation,
				newAffiliation: event.newAffiliation,
			};
		case "DepartmentTransferred":
			return {
				eventName: "DepartmentTransferred",
				previousAffiliation: event.previousAffiliation,
				newAffiliation: event.newAffiliation,
			};
		case "MajorTransferred":
			return {
				eventName: "MajorTransferred",
				previousAffiliation: event.previousAffiliation,
				newAffiliation: event.newAffiliation,
			};
		case "StudentIdChanged":
			return {
				eventName: "StudentIdChanged",
				previousStudentId: event.previousStudentId.getValue(),
				newStudentId: event.newStudentId.getValue(),
			};
		case "NameChanged":
			return {
				eventName: "NameChanged",
				previousName: event.previousName,
				newName: event.newName,
			};
		case "PersonalEmailChanged":
			return {
				eventName: "PersonalEmailChanged",
				previousPersonalEmail: serializeRecorded(event.previousPersonalEmail),
				newPersonalEmail: serializeRecorded(event.newPersonalEmail),
			};
	}
}
