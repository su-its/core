/// <reference types="node" />
import { AsyncLocalStorage } from "node:async_hooks";
import type { PgDatabase } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js/session";
import postgres, { type Sql } from "postgres";
import * as schema from "./schema";

export type DrizzleDb = PgDatabase<PostgresJsQueryResultHKT, typeof schema>;

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

function createDb() {
	return drizzle(getSqlClient(), { schema });
}

const transactionContext = new AsyncLocalStorage<DrizzleDb>();

/**
 * DB接続を取得する
 * トランザクション中であればそのトランザクションを返し、
 * そうでなければ新しいDB接続を返す
 */
export function getDb(): DrizzleDb {
	const tx = transactionContext.getStore();
	if (tx) return tx;
	return createDb();
}

/**
 * トランザクション内で処理を実行する
 * すでにトランザクション中であればそのまま実行する（ネストしない）
 */
export function runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
	if (transactionContext.getStore()) {
		return fn();
	}
	const db = createDb();
	return db.transaction(async (tx) => {
		return transactionContext.run(tx, fn);
	});
}
