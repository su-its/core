import type { Karte } from "./Karte";
import type { KarteId } from "./KarteId";

export interface KarteRepository {
	findById(id: KarteId): Promise<Karte | null>;
	save(karte: Karte): Promise<void>;
}
