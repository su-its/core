import { execSync } from "node:child_process";
import { getTableName, isTable } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import type { DrizzleClient } from "#infrastructure/drizzle/client";
import * as schema from "#infrastructure/drizzle/schema";

export const TEST_DATABASE_URL = "postgresql://core_test:core_test@localhost:5433/core_test";

/** スキーマ定義から _prisma_migrations を除いた全テーブル名を動的に取得 */
const EXCLUDED_TABLES = ["_prisma_migrations"];

function getApplicationTableNames(): string[] {
	return Object.values(schema)
		.filter(isTable)
		.map(getTableName)
		.filter((name) => !EXCLUDED_TABLES.includes(name));
}

let pool: Pool | null = null;
let client: DrizzleClient | null = null;

/** テスト用プールを取得（なければ作成） */
function getPool(): Pool {
	if (!pool) {
		pool = new Pool({ connectionString: TEST_DATABASE_URL });
	}
	return pool;
}

/** テスト用Drizzleクライアントを取得（アサーション用） */
export function getTestClient(): DrizzleClient {
	if (!client) {
		client = drizzle(getPool(), { schema });
	}
	return client;
}

/** マイグレーションを実行してスキーマを最新にする */
export async function setupTestDatabase(): Promise<void> {
	const p = getPool();

	// 接続先がテスト用DBであることを確認（本番DBへの誤接続を防止）
	const result = await p.query("SELECT current_database()");
	const dbName = result.rows[0].current_database;
	if (dbName !== "core_test") {
		throw new Error(
			`テスト用DBではないDBに接続しています: "${dbName}"。接続先が core_test であることを確認してください。`,
		);
	}

	// drizzle-kit pushでスキーマを同期（マイグレーションファイル不要で現在のスキーマを反映）
	execSync("npx drizzle-kit push --force", {
		env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL },
		stdio: "pipe",
	});
}

/** 全アプリケーションテーブルをTRUNCATEする */
export async function cleanDatabase(): Promise<void> {
	const tableNames = getApplicationTableNames();
	if (tableNames.length === 0) return;
	const p = getPool();
	await p.query(`TRUNCATE ${tableNames.join(", ")} CASCADE`);
}

/** テスト用プールを閉じる */
export async function teardownTestDatabase(): Promise<void> {
	if (pool) {
		await pool.end();
		pool = null;
		client = null;
	}
}
