/// <reference types="node" />
import { AsyncLocalStorage } from "node:async_hooks";
<<<<<<< HEAD
import type { PgDatabase } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js/session";
import postgres, { type Sql } from "postgres";
import * as schema from "./schema";

export type DrizzleDb = PgDatabase<PostgresJsQueryResultHKT, typeof schema>;
=======
import type { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import type { PgDatabase } from "drizzle-orm/pg-core";
import { Pool } from "pg";
import * as schema from "./schema";

export type DrizzleClient = PgDatabase<NodePgQueryResultHKT, typeof schema>;

let pool: Pool | null = null;
>>>>>>> 6d5f1a6 (refactor: DrizzleClientをPgDatabase型で定義しトランザクションの強制キャストを除去)

let sqlClient: Sql | null = null;

function getSqlClient(): Sql {
	if (!sqlClient) {
		const connectionString = process.env.DATABASE_URL;
		if (!connectionString) {
			throw new Error("DATABASE_URL environment variable is not set");
		}
		// Supabase の Transaction pool mode は prepared statement をサポートしないため無効化
		sqlClient = postgres(connectionString, { prepare: false });
	}
	return sqlClient;
}

<<<<<<< HEAD
<<<<<<< HEAD
function createDb() {
	return drizzle(getSqlClient(), { schema });
}

const transactionContext = new AsyncLocalStorage<DrizzleDb>();
=======
function createClient() {
=======
function createClient(): DrizzleClient {
>>>>>>> 6d5f1a6 (refactor: DrizzleClientをPgDatabase型で定義しトランザクションの強制キャストを除去)
	return drizzle(getPool(), { schema });
}

const transactionContext = new AsyncLocalStorage<DrizzleClient>();
>>>>>>> 91008a2 (refactor: getDb/createDb/DrizzleDb を getClient/createClient/DrizzleClient にリネーム)

/**
 * Drizzleクライアントを取得する
 * トランザクション中であればそのトランザクションを返し、
 * そうでなければ新しいクライアントを返す
 */
export function getClient(): DrizzleClient {
	const tx = transactionContext.getStore();
	if (tx) return tx;
	return createClient();
}

/**
 * トランザクション内で処理を実行する
 * すでにトランザクション中であればそのまま実行する（ネストしない）
 */
export function runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
	if (transactionContext.getStore()) {
		return fn();
	}
	const db = createClient();
	return db.transaction(async (tx) => {
<<<<<<< HEAD
<<<<<<< HEAD
		return transactionContext.run(tx, fn);
=======
		return transactionContext.run(tx as unknown as DrizzleClient, fn);
>>>>>>> 91008a2 (refactor: getDb/createDb/DrizzleDb を getClient/createClient/DrizzleClient にリネーム)
=======
		return transactionContext.run(tx, fn);
>>>>>>> 6d5f1a6 (refactor: DrizzleClientをPgDatabase型で定義しトランザクションの強制キャストを除去)
	});
}
