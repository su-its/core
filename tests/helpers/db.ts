import { execSync } from "node:child_process";
import { getTableName, isTable } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { escapeIdentifier, Pool } from "pg";
import type { DrizzleClient } from "#infrastructure/drizzle/client";
import * as schema from "#infrastructure/drizzle/schema";
import { TEST_DATABASE_URL, testConfig, testProcessEnv } from "./config";

/** スキーマ定義から _prisma_migrations を除いた全テーブル名を動的に取得 */
const EXCLUDED_TABLES = new Set(["_prisma_migrations"]);
// TODO: #143 が解決されたら _prisma_migrations の暫定除外を削除する。

function getApplicationTableNames(): string[] {
	const tableNames: string[] = [];

	for (const value of Object.values(schema) as unknown[]) {
		if (!isTable(value)) continue;
		tableNames.push(getTableName(value));
	}

	return tableNames.filter((name) => !EXCLUDED_TABLES.has(name));
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
	if (dbName !== testConfig.db.name) {
		throw new Error(
			`テスト用DBではないDBに接続しています: "${dbName}"。接続先が ${testConfig.db.name} であることを確認してください。`,
		);
	}

	// drizzle-kit pushでスキーマを同期（マイグレーションファイル不要で現在のスキーマを反映）
	execSync("vp run db:push -- --force", {
		env: testProcessEnv,
		stdio: "pipe",
	});
}

/** 全アプリケーションテーブルをTRUNCATEする */
export async function cleanDatabase(): Promise<void> {
	const tableNames = getApplicationTableNames();
	if (tableNames.length === 0) return;
	const p = getPool();
	const quotedTableNames = tableNames.map(escapeIdentifier);
	await p.query(`TRUNCATE ${quotedTableNames.join(", ")} CASCADE`);
}

/** テスト用プールを閉じる */
export async function teardownTestDatabase(): Promise<void> {
	if (pool) {
		await pool.end();
		pool = null;
		client = null;
	}
}
