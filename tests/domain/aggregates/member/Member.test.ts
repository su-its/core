import { describe, expect, it } from "vitest";
import { ActiveMember, FormerMember, UnconfirmedMember } from "#domain/aggregates/member/Member";
import { memberId } from "#domain/aggregates/member/MemberId";
import { UniversityEmail } from "#domain/aggregates/member/UniversityEmail";
import { InvalidAffiliationOperationException } from "#domain/exceptions";
import { notRecorded } from "#domain/shared/Recorded";
import { StudentId } from "#domain/shared/StudentId";
import type {
	CompleteDoctoralAffiliation,
	CompleteMasterAffiliation,
	CompleteUndergraduateAffiliation,
} from "#domain/shared/affiliation/Affiliation";

function createEmail() {
	return new UniversityEmail("test@shizuoka.ac.jp");
}

function createStudentId() {
	return StudentId.fromString("725A0001");
}

function createCompleteUndergraduateAffiliation(): CompleteUndergraduateAffiliation {
	return {
		type: "undergraduate",
		value: { faculty: "情報学部", department: "情報科学科", year: 3 },
	};
}

function createCompleteMasterAffiliation(): CompleteMasterAffiliation {
	return {
		type: "master",
		value: {
			school: "総合科学技術研究科",
			major: "情報学専攻",
			course: "基盤情報学コース",
			year: 1,
		},
	};
}

function createCompleteDoctoralAffiliation(): CompleteDoctoralAffiliation {
	return {
		type: "doctoral",
		value: { school: "創造科学技術大学院", major: "情報科学専攻", year: 1 },
	};
}

const TEST_ID = memberId("test-member-id");

function registerMember() {
	return ActiveMember.register({
		id: TEST_ID,
		email: createEmail(),
		name: "テスト太郎",
		personalEmail: notRecorded(),
		studentId: createStudentId(),
		affiliation: createCompleteUndergraduateAffiliation(),
	});
}

describe("ActiveMember", () => {
	describe("register", () => {
		it("室員を登録できる", () => {
			const member = registerMember();

			expect(member.status).toBe("active");
			expect(member.name).toBe("テスト太郎");
			expect(member.email.getValue()).toBe("test@shizuoka.ac.jp");
			expect(member.studentId.getValue()).toBe("725A0001");
		});

		it("MemberRegisteredイベントが発行される", () => {
			const member = registerMember();
			const events = member.getDomainEvents();

			expect(events).toHaveLength(1);
			expect(events[0].eventName).toBe("MemberRegistered");
		});
	});

	describe("reconstruct", () => {
		it("永続化からの復元ではイベントが発行されない", () => {
			const member = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteUndergraduateAffiliation(),
			});

			expect(member.getDomainEvents()).toHaveLength(0);
		});
	});

	describe("remove", () => {
		it("室員を除籍すると元室員になる", () => {
			const active = registerMember();
			const former = active.remove("graduation");

			expect(former.status).toBe("former");
			expect(former.email.getValue()).toBe("test@shizuoka.ac.jp");
			expect(former.name).toBe("テスト太郎");
		});

		it("MemberRemovedイベントが発行される", () => {
			const active = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteUndergraduateAffiliation(),
			});
			const former = active.remove("voluntaryLeave");
			const events = former.getDomainEvents();

			expect(events).toHaveLength(1);
			expect(events[0].eventName).toBe("MemberRemoved");
		});
	});

	describe("unconfirm", () => {
		it("室員を未確認状態にできる", () => {
			const active = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteUndergraduateAffiliation(),
			});
			const unconfirmed = active.unconfirm();

			expect(unconfirmed.status).toBe("unconfirmed");
			expect(unconfirmed.name).toBe("テスト太郎");
		});

		it("MemberUnconfirmedイベントが発行される", () => {
			const active = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteUndergraduateAffiliation(),
			});
			const unconfirmed = active.unconfirm();
			const events = unconfirmed.getDomainEvents();

			expect(events).toHaveLength(1);
			expect(events[0].eventName).toBe("MemberUnconfirmed");
		});
	});

	describe("changeName", () => {
		it("名前を変更した新しいインスタンスが返される", () => {
			const original = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "変更前",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteUndergraduateAffiliation(),
			});
			const updated = original.changeName("変更後");

			expect(updated.name).toBe("変更後");
			expect(original.name).toBe("変更前");
		});
	});

	describe("changeStudentId", () => {
		it("学籍番号を変更できる", () => {
			const original = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: StudentId.fromString("70312031"),
				affiliation: createCompleteUndergraduateAffiliation(),
			});
			const newId = StudentId.fromString("725A0002");
			const updated = original.changeStudentId(newId);

			expect(updated.studentId.getValue()).toBe("725A0002");
			expect(original.studentId.getValue()).toBe("70312031");
		});
	});

	describe("advanceInternally", () => {
		it("学部生から修士に内部進学できる", () => {
			const undergrad = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteUndergraduateAffiliation(),
			});
			const newStudentId = StudentId.fromString("725A0099");
			const master = undergrad.advanceInternally(createCompleteMasterAffiliation(), newStudentId);

			expect(master.status).toBe("active");
			expect(master.affiliation.type).toBe("master");
			expect(master.studentId.getValue()).toBe("725A0099");
		});

		it("修士から博士に内部進学できる", () => {
			const masterMember = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteMasterAffiliation(),
			});
			const newStudentId = StudentId.fromString("725A0100");
			const doctoral = masterMember.advanceInternally(
				createCompleteDoctoralAffiliation(),
				newStudentId,
			);

			expect(doctoral.affiliation.type).toBe("doctoral");
		});

		it("学部生が博士に進学しようとするとエラー", () => {
			const undergrad = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteUndergraduateAffiliation(),
			});

			expect(() =>
				undergrad.advanceInternally(
					createCompleteDoctoralAffiliation(),
					StudentId.fromString("725A0100"),
				),
			).toThrow(InvalidAffiliationOperationException);
		});

		it("博士からの進学はエラー", () => {
			const doctoralMember = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteDoctoralAffiliation(),
			});

			expect(() =>
				doctoralMember.advanceInternally(
					createCompleteDoctoralAffiliation(),
					StudentId.fromString("725A0100"),
				),
			).toThrow(InvalidAffiliationOperationException);
		});
	});

	describe("transferFaculty", () => {
		it("学部生は転学部できる", () => {
			const member = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteUndergraduateAffiliation(),
			});
			const newAffiliation: CompleteUndergraduateAffiliation = {
				type: "undergraduate",
				value: {
					faculty: "工学部",
					department: "機械工学科",
					course: "宇宙・環境コース",
					year: 3,
				},
			};
			const transferred = member.transferFaculty(newAffiliation);

			expect(transferred.affiliation.type).toBe("undergraduate");
		});

		it("大学院生は転学部できない", () => {
			const member = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteMasterAffiliation(),
			});
			const newAffiliation: CompleteUndergraduateAffiliation = {
				type: "undergraduate",
				value: {
					faculty: "工学部",
					department: "機械工学科",
					course: "宇宙・環境コース",
					year: 3,
				},
			};

			expect(() => member.transferFaculty(newAffiliation)).toThrow(
				InvalidAffiliationOperationException,
			);
		});
	});

	describe("transferDepartment", () => {
		it("同一学部内で転学科できる", () => {
			const member = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteUndergraduateAffiliation(),
			});
			const newAffiliation: CompleteUndergraduateAffiliation = {
				type: "undergraduate",
				value: { faculty: "情報学部", department: "行動情報学科", year: 3 },
			};
			const transferred = member.transferDepartment(newAffiliation);

			expect(transferred.affiliation.type).toBe("undergraduate");
		});

		it("別学部への転学科はエラー", () => {
			const member = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteUndergraduateAffiliation(),
			});
			const newAffiliation: CompleteUndergraduateAffiliation = {
				type: "undergraduate",
				value: {
					faculty: "工学部",
					department: "機械工学科",
					course: "宇宙・環境コース",
					year: 3,
				},
			};

			expect(() => member.transferDepartment(newAffiliation)).toThrow(
				InvalidAffiliationOperationException,
			);
		});
	});

	describe("transferMajor", () => {
		it("同一研究科内で転専攻できる", () => {
			const member = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteMasterAffiliation(),
			});
			const newAffiliation: CompleteMasterAffiliation = {
				type: "master",
				value: {
					school: "総合科学技術研究科",
					major: "工学専攻",
					course: "機械工学コース",
					year: 1,
				},
			};
			const transferred = member.transferMajor(newAffiliation);

			expect(transferred.affiliation.type).toBe("master");
		});

		it("学部生は転専攻できない", () => {
			const member = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteUndergraduateAffiliation(),
			});

			expect(() => member.transferMajor(createCompleteMasterAffiliation())).toThrow(
				InvalidAffiliationOperationException,
			);
		});

		it("別研究科への転専攻はエラー", () => {
			const member = ActiveMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
				studentId: createStudentId(),
				affiliation: createCompleteMasterAffiliation(),
			});
			const newAffiliation: CompleteMasterAffiliation = {
				type: "master",
				value: {
					school: "人文社会科学研究科",
					major: "経済専攻",
					course: "国際経営コース",
					year: 1,
				},
			};

			expect(() => member.transferMajor(newAffiliation)).toThrow(
				InvalidAffiliationOperationException,
			);
		});
	});
});

describe("UnconfirmedMember", () => {
	describe("confirm", () => {
		it("確認されると室員に復帰する", () => {
			const unconfirmed = UnconfirmedMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
			});
			const active = unconfirmed.confirm(
				createStudentId(),
				createCompleteUndergraduateAffiliation(),
			);

			expect(active.status).toBe("active");
			expect(active.studentId.getValue()).toBe("725A0001");
		});

		it("MemberConfirmedイベントが発行される", () => {
			const unconfirmed = UnconfirmedMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
			});
			const active = unconfirmed.confirm(
				createStudentId(),
				createCompleteUndergraduateAffiliation(),
			);
			const events = active.getDomainEvents();

			expect(events).toHaveLength(1);
			expect(events[0].eventName).toBe("MemberConfirmed");
		});
	});

	describe("remove", () => {
		it("未確認メンバーを除籍できる", () => {
			const unconfirmed = UnconfirmedMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
			});
			const former = unconfirmed.remove("noResponse");

			expect(former.status).toBe("former");
		});
	});

	describe("changeName", () => {
		it("名前を変更できる", () => {
			const unconfirmed = UnconfirmedMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "変更前",
				personalEmail: notRecorded(),
			});
			const updated = unconfirmed.changeName("変更後");

			expect(updated.name).toBe("変更後");
			expect(updated.status).toBe("unconfirmed");
		});
	});
});

describe("FormerMember", () => {
	describe("reregister", () => {
		it("元室員を再登録すると室員になる", () => {
			const former = FormerMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
			});
			const active = former.reregister(createStudentId(), createCompleteMasterAffiliation());

			expect(active.status).toBe("active");
			expect(active.studentId.getValue()).toBe("725A0001");
			expect(active.affiliation.type).toBe("master");
		});

		it("MemberReregisteredイベントが発行される", () => {
			const former = FormerMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "テスト太郎",
				personalEmail: notRecorded(),
			});
			const active = former.reregister(createStudentId(), createCompleteMasterAffiliation());
			const events = active.getDomainEvents();

			expect(events).toHaveLength(1);
			expect(events[0].eventName).toBe("MemberReregistered");
		});
	});

	describe("changeName", () => {
		it("元室員の名前を変更できる", () => {
			const former = FormerMember.reconstruct({
				id: TEST_ID,
				email: createEmail(),
				name: "変更前",
				personalEmail: notRecorded(),
			});
			const updated = former.changeName("変更後");

			expect(updated.name).toBe("変更後");
			expect(updated.status).toBe("former");
		});
	});
});

describe("状態遷移のライフサイクル", () => {
	it("登録→除籍→再登録のフローでイベントが正しく蓄積される", () => {
		const active = ActiveMember.register({
			id: TEST_ID,
			email: createEmail(),
			name: "テスト太郎",
			personalEmail: notRecorded(),
			studentId: createStudentId(),
			affiliation: createCompleteUndergraduateAffiliation(),
		});

		const former = active.remove("graduation");
		const reregistered = former.reregister(
			StudentId.fromString("725A0099"),
			createCompleteMasterAffiliation(),
		);

		const events = reregistered.getDomainEvents();
		expect(events).toHaveLength(3);
		expect(events[0].eventName).toBe("MemberRegistered");
		expect(events[1].eventName).toBe("MemberRemoved");
		expect(events[2].eventName).toBe("MemberReregistered");
	});

	it("登録→未確認→確認のフローでイベントが正しく蓄積される", () => {
		const active = ActiveMember.register({
			id: TEST_ID,
			email: createEmail(),
			name: "テスト太郎",
			personalEmail: notRecorded(),
			studentId: createStudentId(),
			affiliation: createCompleteUndergraduateAffiliation(),
		});

		const unconfirmed = active.unconfirm();
		const confirmed = unconfirmed.confirm(createStudentId(), createCompleteMasterAffiliation());

		const events = confirmed.getDomainEvents();
		expect(events).toHaveLength(3);
		expect(events[0].eventName).toBe("MemberRegistered");
		expect(events[1].eventName).toBe("MemberUnconfirmed");
		expect(events[2].eventName).toBe("MemberConfirmed");
	});
});
