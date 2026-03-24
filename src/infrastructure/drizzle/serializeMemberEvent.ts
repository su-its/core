import type { Email, MemberDomainEvent, Recorded } from "#domain";
import type { MemberEventPayload } from "./schema";

function serializeRecorded(rec: Recorded<Email>): Recorded<string> {
	return rec.type === "recorded"
		? { type: "recorded", value: rec.value.getValue() }
		: { type: "notRecorded" };
}

export function serializeMemberEventPayload(event: MemberDomainEvent): MemberEventPayload {
	switch (event.eventName) {
		case "MemberRegistered":
			return {
				name: event.name,
				personalEmail: serializeRecorded(event.personalEmail),
				studentId: event.studentId.getValue(),
				affiliation: event.affiliation,
			};
		case "MemberRemoved":
			return { reason: event.reason };
		case "MemberReregistered":
			return {
				studentId: event.studentId.getValue(),
				affiliation: event.affiliation,
			};
		case "MemberUnconfirmed":
			return {};
		case "MemberConfirmed":
			return {
				studentId: event.studentId.getValue(),
				affiliation: event.affiliation,
			};
		case "InternallyAdvanced":
			return {
				previousAffiliation: event.previousAffiliation,
				newAffiliation: event.newAffiliation,
				previousStudentId: event.previousStudentId.getValue(),
				newStudentId: event.newStudentId.getValue(),
			};
		case "FacultyTransferred":
			return {
				previousAffiliation: event.previousAffiliation,
				newAffiliation: event.newAffiliation,
			};
		case "DepartmentTransferred":
			return {
				previousAffiliation: event.previousAffiliation,
				newAffiliation: event.newAffiliation,
			};
		case "MajorTransferred":
			return {
				previousAffiliation: event.previousAffiliation,
				newAffiliation: event.newAffiliation,
			};
		case "StudentIdChanged":
			return {
				previousStudentId: event.previousStudentId.getValue(),
				newStudentId: event.newStudentId.getValue(),
			};
		case "NameChanged":
			return {
				previousName: event.previousName,
				newName: event.newName,
			};
		case "PersonalEmailChanged":
			return {
				previousPersonalEmail: serializeRecorded(event.previousPersonalEmail),
				newPersonalEmail: serializeRecorded(event.newPersonalEmail),
			};
	}
}
