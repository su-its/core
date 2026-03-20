import type { ExternalServiceLink } from "./ExternalServiceLink";

export interface ExternalServiceLinkRepository {
	findByServiceAndUserId(
		serviceName: string,
		userId: string,
	): Promise<ExternalServiceLink | null>;
	findByPersonEmail(email: string): Promise<ExternalServiceLink[]>;
	save(link: ExternalServiceLink): Promise<void>;
	delete(serviceName: string, userId: string): Promise<void>;
}
