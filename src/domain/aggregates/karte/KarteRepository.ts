import type { Karte } from "./Karte";
import type { KarteId } from "./KarteId";

export interface KarteRepository {
	findById(id: KarteId): Promise<Karte | null>;
	findByClientStudentId(studentId: string): Promise<Karte[]>;
	findAll(): Promise<Karte[]>;
	save(karte: Karte): Promise<void>;
	delete(karteId: KarteId): Promise<void>;
}
