import type { Karte } from "./Karte";

export interface KarteRepository {
	findById(id: string): Promise<Karte | null>;
	findByClientStudentId(studentId: string): Promise<Karte[]>;
	findAll(): Promise<Karte[]>;
	save(karte: Karte): Promise<void>;
	delete(karteId: string): Promise<void>;
}
