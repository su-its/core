import {
	DiscordAccountAlreadyConnectedException,
	DiscordAccountNotConnectedException,
} from "../exceptions/DomainExceptions";
import type { Department } from "../value-objects/Departments";
import type { Email } from "../value-objects/Email";
import type { UniversityEmail } from "../value-objects/UniversityEmail";
import type { DiscordAccount } from "./DiscordAccount";

export class Member {
	private discordAccounts: DiscordAccount[] = [];

	constructor(
		readonly id: string,
		public name: string,
		public studentId: string,
		public department: Department,
		public email: UniversityEmail,
		public personalEmail?: Email,
	) {}

	setName(newName: string) {
		this.name = newName;
	}

	setStudentId(newStudentId: string) {
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
		const existingAccount = this.discordAccounts.find(
			(account) => account.id === discordAccount.id,
		);
		if (existingAccount) {
			throw new DiscordAccountAlreadyConnectedException();
		}
		this.discordAccounts.push(discordAccount);
	}

	removeDiscordAccount(discordAccountId: string) {
		const accountIndex = this.discordAccounts.findIndex(
			(account) => account.id === discordAccountId,
		);
		if (accountIndex === -1) {
			throw new DiscordAccountNotConnectedException();
		}
		this.discordAccounts.splice(accountIndex, 1);
	}

	getDiscordAccounts() {
		return this.discordAccounts;
	}

	getDiscordAccountById(discordAccountId: string) {
		return this.discordAccounts.find(
			(account) => account.id === discordAccountId,
		);
	}
}
