import type { ExternalServiceLink, ServiceName } from "./ExternalServiceLink";

export interface ExternalServiceLinkRepository {
	findByServiceAndUserId(
		serviceName: ServiceName,
		userId: string,
	): Promise<ExternalServiceLink | null>;
	findByPersonEmail(email: string): Promise<ExternalServiceLink[]>;
	save(link: ExternalServiceLink): Promise<void>;
	delete(serviceName: ServiceName, userId: string): Promise<void>;
}
