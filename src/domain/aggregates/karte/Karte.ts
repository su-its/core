import type { Client } from "./Client";
import type { Consent } from "./Consent";
import type { Consultation } from "./Consultation";
import type { Response } from "./Response";

/**
 * カルテ集約ルート
 *
 * PC相談室での相談記録を表す。
 * 同意事項・相談事・対応事という3つのドメイン概念で構成される。
 */
export class Karte {
	constructor(
		public readonly id: string,
		private readonly recordedAt: Date,
		private lastUpdatedAt: Date,
		private client: Client,
		private consent: Consent,
		private consultation: Consultation,
		private response: Response,
	) {}

	getRecordedAt(): Date {
		return this.recordedAt;
	}

	getLastUpdatedAt(): Date {
		return this.lastUpdatedAt;
	}

	getClient(): Client {
		return this.client;
	}

	getConsent(): Consent {
		return this.consent;
	}

	getConsultation(): Consultation {
		return this.consultation;
	}

	getResponse(): Response {
		return this.response;
	}

	updateConsent(consent: Consent): void {
		this.consent = consent;
		this.touch();
	}

	updateConsultation(consultation: Consultation): void {
		this.consultation = consultation;
		this.touch();
	}

	updateResponse(response: Response): void {
		this.response = response;
		this.touch();
	}

	updateClient(client: Client): void {
		this.client = client;
		this.touch();
	}

	private touch(): void {
		this.lastUpdatedAt = new Date();
	}

	private snapshotClient(): Record<string, unknown> {
		const base = {
			type: this.client.type,
			name: this.client.name,
			affiliation: this.client.affiliation.getValue(),
		};
		if (this.client.type === "student") {
			return { ...base, studentId: this.client.studentId.getValue() };
		}
		return base;
	}

	private snapshotCategories(): Array<{ id: string; displayName: string }> {
		return this.consultation.categories.map((c) => ({
			id: c.id,
			displayName: c.displayName,
		}));
	}

	toSnapshot() {
		return {
			id: this.id,
			recordedAt: this.recordedAt,
			lastUpdatedAt: this.lastUpdatedAt,
			client: this.snapshotClient(),
			consent: this.consent,
			consultation: {
				categories: this.snapshotCategories(),
				targetDevice: this.consultation.targetDevice,
				troubleDetails: this.consultation.troubleDetails,
			},
			response: {
				assignedMemberIds: [...this.response.assignedMemberIds],
				responseContent: this.response.responseContent,
				resolution: this.response.resolution,
				followUpDestination: this.response.followUpDestination,
				workDuration: this.response.workDuration,
			},
		};
	}
}
