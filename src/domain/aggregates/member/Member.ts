import {
	DiscordAccountAlreadyConnectedException,
	DiscordAccountNotConnectedException,
} from "#domain/exceptions";
import type { StudentId } from "#domain/shared/StudentId";
import type { Department } from "./Departments";
import type { DiscordAccount } from "./DiscordAccount";
import type { Email } from "./Email";
import type { MemberId } from "./MemberId";
import type { UniversityEmail } from "./UniversityEmail";

export class Member {
	private discordAccounts: DiscordAccount[] = [];

	constructor(
		public readonly id: MemberId,
		private name: string,
		private studentId: StudentId,
		private department: Department,
		private email: UniversityEmail,
		private personalEmail?: Email,
	) {}

	getName() {
		return this.name;
	}

	getStudentId() {
		return this.studentId;
	}

	getDepartment() {
		return this.department;
	}

	getEmail() {
		return this.email;
	}

	getPersonalEmail() {
		return this.personalEmail;
	}

	getDiscordAccounts() {
		return this.discordAccounts;
	}

	setName(newName: string) {
		this.name = newName;
	}

	setStudentId(newStudentId: StudentId) {
		this.studentId = newStudentId;
	}

	setDepartment(newDepartment: Department) {
		this.department = newDepartment;
	}

	setEmail(newEmail: UniversityEmail) {
		this.email = newEmail;
	}

	setPersonalEmail(newPersonalEmail?: Email) {
		this.personalEmail = newPersonalEmail;
	}

	addDiscordAccount(discordAccount: DiscordAccount) {
		if (this.getDiscordAccountById(discordAccount.id)) {
			throw new DiscordAccountAlreadyConnectedException();
		}
		this.discordAccounts.push(discordAccount);
	}

	removeDiscordAccount(discordAccountId: string) {
		this.getDiscordAccountOrThrow(discordAccountId);
		this.discordAccounts = this.discordAccounts.filter(
			(account) => account.id !== discordAccountId,
		);
	}

	getDiscordAccountById(discordAccountId: string) {
		return this.discordAccounts.find(
			(account) => account.id === discordAccountId,
		);
	}

	getDiscordAccountOrThrow(discordAccountId: string) {
		const account = this.getDiscordAccountById(discordAccountId);
		if (!account) {
			throw new DiscordAccountNotConnectedException();
		}
		return account;
	}

	setDiscordAccountNickName(discordAccountId: string, newNickName: string) {
		this.getDiscordAccountOrThrow(discordAccountId).setNickName(newNickName);
	}

	toSnapshot() {
		return {
			id: this.id,
			name: this.name,
			studentId: this.studentId.getValue(),
			department: this.department,
			email: this.email,
			personalEmail: this.personalEmail,
			discordAccounts: this.discordAccounts.map((account) =>
				account.toSnapshot(),
			),
		};
	}
}
