import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { afterAll, afterEach, beforeAll } from "vitest";
import * as schema from "../src/infrastructure/drizzle/schema";

let pool: Pool;
let db: ReturnType<typeof drizzle>;

beforeAll(async () => {
	const connectionString = process.env.DATABASE_URL;
	if (!connectionString) {
		throw new Error("DATABASE_URL environment variable is not set");
	}

	// 本番DB接続防止ガード
	if (
		!connectionString.includes("localhost") &&
		!connectionString.includes("test")
	) {
		throw new Error(
			"本番DBへの接続を防止: DATABASE_URLにlocalhostまたはtestが含まれていません",
		);
	}

	pool = new Pool({ connectionString });
	db = drizzle(pool, { schema });
});

afterEach(async () => {
	// テーブルをtruncate（順序に注意：外部キー制約）
	await db.execute(sql`TRUNCATE TABLE member_exhibits CASCADE`);
	await db.execute(sql`TRUNCATE TABLE member_events CASCADE`);
	await db.execute(sql`TRUNCATE TABLE lightning_talks CASCADE`);
	await db.execute(sql`TRUNCATE TABLE exhibits CASCADE`);
	await db.execute(sql`TRUNCATE TABLE discord_accounts CASCADE`);
	await db.execute(sql`TRUNCATE TABLE events CASCADE`);
	await db.execute(sql`TRUNCATE TABLE members CASCADE`);
});

afterAll(async () => {
	await pool.end();
});

export function getTestDb() {
	return db;
}
