import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, type PoolClient } from "pg";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { resetTestDb, setTestDb } from "../src/infrastructure/drizzle/client";
import * as schema from "../src/infrastructure/drizzle/schema";

let pool: Pool;
let client: PoolClient;

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
});

beforeEach(async () => {
	// 各テストでトランザクションを開始
	client = await pool.connect();
	await client.query("BEGIN");

	// トランザクション内のDBをリポジトリに使わせる
	const db = drizzle(client, { schema });
	setTestDb(db);
});

afterEach(async () => {
	// トランザクションをロールバック（変更を破棄）
	await client.query("ROLLBACK");
	client.release();
	resetTestDb();
});

afterAll(async () => {
	await pool.end();
});
