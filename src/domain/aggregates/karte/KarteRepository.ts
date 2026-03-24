import type { Karte } from "./Karte.ts";
import type { KarteId } from "./KarteId.ts";

export interface KarteRepository {
	findById(id: KarteId): Promise<Karte | null>;
	findAll(): Promise<Karte[]>;
	save(karte: Karte): Promise<void>;
}
