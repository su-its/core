import type { Karte } from "#domain/aggregates/karte/Karte";
import type { KarteId } from "#domain/aggregates/karte/KarteId";
import type { KarteRepository } from "#domain/aggregates/karte/KarteRepository";

/**
 * カルテリポジトリのDrizzle実装
 *
 * TODO: karteテーブルのスキーマ定義後に本実装を行う
 */
export class DrizzleKarteRepository implements KarteRepository {
  async findById(_id: KarteId): Promise<Karte | null> {
    throw new Error("Not implemented: DrizzleKarteRepository.findById");
  }

  async findAll(): Promise<Karte[]> {
    throw new Error("Not implemented: DrizzleKarteRepository.findAll");
  }

  async save(_karte: Karte): Promise<void> {
    throw new Error("Not implemented: DrizzleKarteRepository.save");
  }
}
