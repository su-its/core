import { describe, expect, it } from "vitest";
import {
	ActiveMember,
	Email,
	StudentId,
	UniversityEmail,
	memberId,
	notRecorded,
	recorded,
	type CompleteMasterAffiliation,
	type CompleteUndergraduateAffiliation,
} from "#domain";
import { serializeMemberEventPayload } from "#infrastructure/drizzle/serializeMemberEvent";

const testId = memberId("test-member-id");
const testEmail = new UniversityEmail("test@shizuoka.ac.jp");
const testStudentId = StudentId.fromString("725A0001");
const testAffiliation: CompleteUndergraduateAffiliation = {
	type: "undergraduate",
	value: { faculty: "情報学部", department: "情報科学科", year: 3 },
};

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

describe("serializeMemberEventPayload", () => {
	it("MemberRegisteredイベントをシリアライズできる", () => {
		const member = createActiveMember();
		const events = member.getDomainEvents();
		expect(events).toHaveLength(1);

		const payload = serializeMemberEventPayload(events[0]);
		expect(payload).toEqual({
			name: "テスト太郎",
			studentId: "725A0001",
			personalEmail: { type: "notRecorded" },
			affiliation: {
				type: "undergraduate",
				value: { faculty: "情報学部", department: "情報科学科", year: 3 },
			},
		});
	});

	it("NameChangedイベントをシリアライズできる", () => {
		const member = createActiveMember().changeName("新しい名前");
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "NameChanged");
		if (!event) throw new Error("NameChanged event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({
			previousName: "テスト太郎",
			newName: "新しい名前",
		});
	});

	it("MemberRemovedイベントをシリアライズできる", () => {
		const member = createActiveMember().remove("graduation");
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "MemberRemoved");
		if (!event) throw new Error("MemberRemoved event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({ reason: "graduation" });
	});

	it("InternallyAdvancedイベントをシリアライズできる", () => {
		const masterAffiliation: CompleteMasterAffiliation = {
			type: "master",
			value: {
				school: "総合科学技術研究科",
				major: "情報学専攻",
				course: "基盤情報学コース",
				year: 1,
			},
		};
		const newStudentId = StudentId.fromString("925A0001");
		const member = createActiveMember().advanceInternally(
			masterAffiliation,
			newStudentId,
		);
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "InternallyAdvanced");
		if (!event) throw new Error("InternallyAdvanced event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({
			previousAffiliation: testAffiliation,
			newAffiliation: masterAffiliation,
			previousStudentId: "725A0001",
			newStudentId: "925A0001",
		});
	});

	it("PersonalEmailChangedイベントをシリアライズできる", () => {
		const newEmail = recorded(new Email("new@example.com"));
		const member = createActiveMember().changePersonalEmail(newEmail);
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "PersonalEmailChanged");
		if (!event) throw new Error("PersonalEmailChanged event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({
			previousPersonalEmail: { type: "notRecorded" },
			newPersonalEmail: { type: "recorded", value: "new@example.com" },
		});
	});

	it("MemberUnconfirmedイベントをシリアライズできる", () => {
		const member = createActiveMember().unconfirm();
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "MemberUnconfirmed");
		if (!event) throw new Error("MemberUnconfirmed event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({});
	});

	it("MemberConfirmedイベントをシリアライズできる", () => {
		const unconfirmed = createActiveMember().unconfirm();
		const confirmed = unconfirmed.confirm(testStudentId, testAffiliation);
		const events = confirmed.getDomainEvents();
		const event = events.find((e) => e.eventName === "MemberConfirmed");
		if (!event) throw new Error("MemberConfirmed event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({
			studentId: "725A0001",
			affiliation: testAffiliation,
		});
	});

	it("MemberReregisteredイベントをシリアライズできる", () => {
		const former = createActiveMember().remove("graduation");
		const reregistered = former.reregister(testStudentId, testAffiliation);
		const events = reregistered.getDomainEvents();
		const event = events.find((e) => e.eventName === "MemberReregistered");
		if (!event) throw new Error("MemberReregistered event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({
			studentId: "725A0001",
			affiliation: testAffiliation,
		});
	});

	it("FacultyTransferredイベントをシリアライズできる", () => {
		const newAffiliation: CompleteUndergraduateAffiliation = {
			type: "undergraduate",
			value: { faculty: "理学部", department: "物理学科", year: 3 },
		};
		const member = createActiveMember().transferFaculty(newAffiliation);
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "FacultyTransferred");
		if (!event) throw new Error("FacultyTransferred event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({
			previousAffiliation: testAffiliation,
			newAffiliation,
		});
	});

	it("DepartmentTransferredイベントをシリアライズできる", () => {
		const newAffiliation: CompleteUndergraduateAffiliation = {
			type: "undergraduate",
			value: { faculty: "情報学部", department: "行動情報学科", year: 3 },
		};
		const member = createActiveMember().transferDepartment(newAffiliation);
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "DepartmentTransferred");
		if (!event) throw new Error("DepartmentTransferred event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({
			previousAffiliation: testAffiliation,
			newAffiliation,
		});
	});

	it("MajorTransferredイベントをシリアライズできる", () => {
		const masterAffiliation: CompleteMasterAffiliation = {
			type: "master",
			value: {
				school: "総合科学技術研究科",
				major: "情報学専攻",
				course: "基盤情報学コース",
				year: 1,
			},
		};
		const newMajor: CompleteMasterAffiliation = {
			type: "master",
			value: {
				school: "総合科学技術研究科",
				major: "工学専攻",
				course: "機械工学コース",
				year: 1,
			},
		};
		const member = ActiveMember.reconstruct({
			id: testId,
			email: testEmail,
			name: "テスト太郎",
			personalEmail: notRecorded(),
			studentId: testStudentId,
			affiliation: masterAffiliation,
		}).transferMajor(newMajor);
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "MajorTransferred");
		if (!event) throw new Error("MajorTransferred event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({
			previousAffiliation: masterAffiliation,
			newAffiliation: newMajor,
		});
	});

	it("StudentIdChangedイベントをシリアライズできる", () => {
		const newStudentId = StudentId.fromString("725A0002");
		const member = createActiveMember().changeStudentId(newStudentId);
		const events = member.getDomainEvents();
		const event = events.find((e) => e.eventName === "StudentIdChanged");
		if (!event) throw new Error("StudentIdChanged event not found");

		const payload = serializeMemberEventPayload(event);
		expect(payload).toEqual({
			previousStudentId: "725A0001",
			newStudentId: "725A0002",
		});
	});

	it("複数イベントが正しくシリアライズされる", () => {
		const member = createActiveMember()
			.changeName("新しい名前")
			.changeStudentId(StudentId.fromString("725A0002"));
		const events = member.getDomainEvents();
		expect(events).toHaveLength(3);

		expect(events[0].eventName).toBe("MemberRegistered");
		expect(events[1].eventName).toBe("NameChanged");
		expect(events[2].eventName).toBe("StudentIdChanged");

		// Each payload serializes without error
		for (const event of events) {
			serializeMemberEventPayload(event);
		}
	});
});
