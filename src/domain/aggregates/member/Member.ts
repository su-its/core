import {
	DiscordAccountAlreadyConnectedException,
	DiscordAccountNotConnectedException,
} from "../../exceptions/DomainExceptions";
import type { Department } from "../../value-objects/Departments";
import type { Email } from "../../value-objects/Email";
import type { UniversityEmail } from "../../value-objects/UniversityEmail";
import type { DiscordAccount } from "./DiscordAccount";

export class Member {
	private discordAccounts: DiscordAccount[] = [];

	constructor(
		public readonly id: string,
		private name: string,
		private studentId: string,
		private department: Department,
		private email: UniversityEmail,
		private personalEmail?: Email,
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

	getDiscordAccounts() {
		return this.discordAccounts;
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
			studentId: this.studentId,
			department: this.department,
			email: this.email,
			personalEmail: this.personalEmail,
			discordAccounts: this.discordAccounts.map((account) =>
				account.toSnapshot(),
			),
		};
	}
}
