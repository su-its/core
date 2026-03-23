import { describe, expect, it } from "vitest";
import { ActiveMember } from "#domain/aggregates/member/Member";
import { Email } from "#domain/aggregates/member/Email";
import { memberId } from "#domain/aggregates/member/MemberId";
import { UniversityEmail } from "#domain/aggregates/member/UniversityEmail";
import { notRecorded, recorded } from "#domain/shared/Recorded";
import { StudentId } from "#domain/shared/StudentId";
import {
	MasterAffiliation,
	UndergraduateAffiliation,
} from "#domain/shared/affiliation/Affiliation";
import {
	serializeAffiliation,
	serializeMemberEventPayload,
} from "#infrastructure/drizzle/serializeMemberEvent";

const testId = memberId("test-member-id");
const testEmail = new UniversityEmail("test@shizuoka.ac.jp");
const testStudentId = StudentId.fromString("725A0001");
const testAffiliation = new UndergraduateAffiliation({
	faculty: "情報学部",
	department: "情報科学科",
	year: 3,
});

function createActiveMember() {
	return ActiveMember.register({
		id: testId,
		email: testEmail,
		name: "テスト太郎",
		personalEmail: notRecorded(),
		studentId: testStudentId,
		affiliation: testAffiliation,
	});
}

describe("serializeAffiliation", () => {
	it("学部所属をシリアライズできる", () => {
		const result = serializeAffiliation(testAffiliation);
		expect(result).toEqual({
			type: "undergraduate",
			value: { faculty: "情報学部", department: "情報科学科", year: 3 },
		});
	});

	it("修士所属をシリアライズできる", () => {
		const master = new MasterAffiliation({
			school: "総合科学技術研究科",
			major: "情報学専攻",
			course: "基盤情報学コース",
			year: 1,
		});
		const result = serializeAffiliation(master);
		expect(result).toEqual({
			type: "master",
			value: {
				school: "総合科学技術研究科",
				major: "情報学専攻",
				course: "基盤情報学コース",
				year: 1,
			},
		});
	});
});

describe("serializeMemberEventPayload", () => {
	it("MemberRegisteredイベントをシリアライズできる", () => {
		const member = createActiveMember();
		const events = member.getDomainEvents();
		expect(events).toHaveLength(1);

		const payload = serializeMemberEventPayload(events[0]);
		expect(payload.eventName).toBe("MemberRegistered");
		if (payload.eventName !== "MemberRegistered") throw new Error();
		expect(payload.name).toBe("テスト太郎");
		expect(payload.studentId).toBe("725A0001");
		expect(payload.personalEmail).toEqual({ type: "notRecorded" });
		expect(payload.affiliation).toEqual({
			type: "undergraduate",
			value: { faculty: "情報学部", department: "情報科学科", year: 3 },
		});
	});

	it("NameChangedイベントをシリアライズできる", () => {
		const member = createActiveMember().changeName("新しい名前");
		const events = member.getDomainEvents();
		const nameEvent = events.find((e) => e.eventName === "NameChanged");
		if (!nameEvent) throw new Error("NameChanged event not found");

		const payload = serializeMemberEventPayload(nameEvent);
		expect(payload.eventName).toBe("NameChanged");
		if (payload.eventName !== "NameChanged") throw new Error();
		expect(payload.previousName).toBe("テスト太郎");
		expect(payload.newName).toBe("新しい名前");
	});

	it("MemberRemovedイベントをシリアライズできる", () => {
		const member = createActiveMember().remove("graduation");
		const events = member.getDomainEvents();
		const removedEvent = events.find((e) => e.eventName === "MemberRemoved");
		if (!removedEvent) throw new Error("MemberRemoved event not found");

		const payload = serializeMemberEventPayload(removedEvent);
		expect(payload.eventName).toBe("MemberRemoved");
		if (payload.eventName !== "MemberRemoved") throw new Error();
		expect(payload.reason).toBe("graduation");
	});

	it("MemberUnconfirmedイベントをシリアライズできる", () => {
		const member = createActiveMember().unconfirm();
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "MemberUnconfirmed");
		if (!event) throw new Error("MemberUnconfirmed event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({ eventName: "MemberUnconfirmed" });
	});

	it("StudentIdChangedイベントをシリアライズできる", () => {
		const newStudentId = StudentId.fromString("725A0002");
		const member = createActiveMember().changeStudentId(newStudentId);
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "StudentIdChanged");
		if (!event) throw new Error("StudentIdChanged event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload.eventName).toBe("StudentIdChanged");
		if (payload.eventName !== "StudentIdChanged") throw new Error();
		expect(payload.previousStudentId).toBe("725A0001");
		expect(payload.newStudentId).toBe("725A0002");
	});

	it("PersonalEmailChangedイベントをシリアライズできる", () => {
		const newEmail = recorded(new Email("new@example.com"));
		const member = createActiveMember().changePersonalEmail(newEmail);
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "PersonalEmailChanged");
		if (!event) throw new Error("PersonalEmailChanged event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload.eventName).toBe("PersonalEmailChanged");
		if (payload.eventName !== "PersonalEmailChanged") throw new Error();
		expect(payload.previousPersonalEmail).toEqual({ type: "notRecorded" });
		expect(payload.newPersonalEmail).toEqual({
			type: "recorded",
			value: "new@example.com",
		});
	});

	it("InternallyAdvancedイベントをシリアライズできる", () => {
		const masterAffiliation = new MasterAffiliation({
			school: "総合科学技術研究科",
			major: "情報学専攻",
			course: "基盤情報学コース",
			year: 1,
		});
		const newStudentId = StudentId.fromString("925A0001");
		const member = createActiveMember().advanceInternally(
			masterAffiliation,
			newStudentId,
		);
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "InternallyAdvanced");
		if (!event) throw new Error("InternallyAdvanced event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload.eventName).toBe("InternallyAdvanced");
		if (payload.eventName !== "InternallyAdvanced") throw new Error();
		expect(payload.previousAffiliation.type).toBe("undergraduate");
		expect(payload.newAffiliation.type).toBe("master");
		expect(payload.previousStudentId).toBe("725A0001");
		expect(payload.newStudentId).toBe("925A0001");
	});

	it("FacultyTransferredイベントをシリアライズできる", () => {
		const newAffiliation = new UndergraduateAffiliation({
			faculty: "理学部",
			department: "物理学科",
			year: 3,
		});
		const member = createActiveMember().transferFaculty(newAffiliation);
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "FacultyTransferred");
		if (!event) throw new Error("FacultyTransferred event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload.eventName).toBe("FacultyTransferred");
		if (payload.eventName !== "FacultyTransferred") throw new Error();
		expect(payload.previousAffiliation).toEqual({
			type: "undergraduate",
			value: { faculty: "情報学部", department: "情報科学科", year: 3 },
		});
		expect(payload.newAffiliation).toEqual({
			type: "undergraduate",
			value: { faculty: "理学部", department: "物理学科", year: 3 },
		});
	});

	it("複数イベントが正しくシリアライズされる", () => {
		const member = createActiveMember()
			.changeName("新しい名前")
			.changeStudentId(StudentId.fromString("725A0002"));
		const events = member.getDomainEvents();
		expect(events).toHaveLength(3);

		const payloads = events.map((e) => serializeMemberEventPayload(e));
		expect(payloads[0]?.eventName).toBe("MemberRegistered");
		expect(payloads[1]?.eventName).toBe("NameChanged");
		expect(payloads[2]?.eventName).toBe("StudentIdChanged");
	});

	it("MemberConfirmedイベントをシリアライズできる", () => {
		const unconfirmed = createActiveMember().unconfirm();
		const confirmed = unconfirmed.confirm(testStudentId, testAffiliation);
		const events = confirmed.getDomainEvents();
		const event = events.find((e) => e.eventName === "MemberConfirmed");
		if (!event) throw new Error("MemberConfirmed event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload.eventName).toBe("MemberConfirmed");
		if (payload.eventName !== "MemberConfirmed") throw new Error();
		expect(payload.studentId).toBe("725A0001");
		expect(payload.affiliation.type).toBe("undergraduate");
	});

	it("MemberReregisteredイベントをシリアライズできる", () => {
		const former = createActiveMember().remove("graduation");
		const reregistered = former.reregister(testStudentId, testAffiliation);
		const events = reregistered.getDomainEvents();
		const event = events.find((e) => e.eventName === "MemberReregistered");
		if (!event) throw new Error("MemberReregistered event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload.eventName).toBe("MemberReregistered");
		if (payload.eventName !== "MemberReregistered") throw new Error();
		expect(payload.studentId).toBe("725A0001");
	});
});
