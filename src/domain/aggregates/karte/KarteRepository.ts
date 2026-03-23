import type { Karte } from "./Karte";
import type { KarteId } from "./KarteId";

export interface KarteRepository {
	findById(id: KarteId): Promise<Karte | null>;
	findAll(): Promise<Karte[]>;
	save(karte: Karte): Promise<void>;
}
