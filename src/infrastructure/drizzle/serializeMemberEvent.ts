import type { MemberDomainEvent } from "#domain/aggregates/member/MemberEvent";
import type { Email } from "#domain/aggregates/member/Email";
import type { Recorded } from "#domain/shared/Recorded";
import type { Affiliation } from "#domain/shared/affiliation/Affiliation";
import {
	DoctoralAffiliation,
	MasterAffiliation,
	ProfessionalAffiliation,
	UndergraduateAffiliation,
} from "#domain/shared/affiliation/Affiliation";
import type {
	SerializedAffiliation,
	SerializedMemberEventPayload,
} from "./schema";

function serializeRecorded(
	rec: Recorded<Email>,
): { type: "recorded"; value: string } | { type: "notRecorded" } {
	return rec.type === "recorded"
		? { type: "recorded", value: rec.value.getValue() }
		: { type: "notRecorded" };
}

export function serializeAffiliation(
	affiliation: Affiliation,
): SerializedAffiliation {
	if (affiliation instanceof UndergraduateAffiliation) {
		return { type: "undergraduate", value: affiliation.getValue() };
	}
	if (affiliation instanceof MasterAffiliation) {
		return { type: "master", value: affiliation.getValue() };
	}
	if (affiliation instanceof DoctoralAffiliation) {
		return { type: "doctoral", value: affiliation.getValue() };
	}
	if (affiliation instanceof ProfessionalAffiliation) {
		return { type: "professional", value: affiliation.getValue() };
	}
	const _: never = affiliation;
	throw new Error(`Unknown affiliation type: ${_}`);
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
				affiliation: serializeAffiliation(event.affiliation),
			};
		case "MemberDeregistered":
			return { eventName: "MemberDeregistered", reason: event.reason };
		case "MemberReregistered":
			return {
				eventName: "MemberReregistered",
				studentId: event.studentId.getValue(),
				affiliation: serializeAffiliation(event.affiliation),
			};
		case "MemberUnconfirmed":
			return { eventName: "MemberUnconfirmed" };
		case "MemberConfirmed":
			return {
				eventName: "MemberConfirmed",
				studentId: event.studentId.getValue(),
				affiliation: serializeAffiliation(event.affiliation),
			};
		case "InternallyAdvanced":
			return {
				eventName: "InternallyAdvanced",
				previousAffiliation: serializeAffiliation(event.previousAffiliation),
				newAffiliation: serializeAffiliation(event.newAffiliation),
				previousStudentId: event.previousStudentId.getValue(),
				newStudentId: event.newStudentId.getValue(),
			};
		case "FacultyTransferred":
			return {
				eventName: "FacultyTransferred",
				previousAffiliation: serializeAffiliation(event.previousAffiliation),
				newAffiliation: serializeAffiliation(event.newAffiliation),
			};
		case "DepartmentTransferred":
			return {
				eventName: "DepartmentTransferred",
				previousAffiliation: serializeAffiliation(event.previousAffiliation),
				newAffiliation: serializeAffiliation(event.newAffiliation),
			};
		case "MajorTransferred":
			return {
				eventName: "MajorTransferred",
				previousAffiliation: serializeAffiliation(event.previousAffiliation),
				newAffiliation: serializeAffiliation(event.newAffiliation),
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
