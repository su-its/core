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

<<<<<<< HEAD
function createDb() {
	return drizzle(getSqlClient(), { schema });
}

const transactionContext = new AsyncLocalStorage<DrizzleDb>();
=======
function createClient() {
	return drizzle(getPool(), { schema });
}

export type DrizzleClient = ReturnType<typeof createClient>;

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
		return transactionContext.run(tx, fn);
=======
		return transactionContext.run(tx as unknown as DrizzleClient, fn);
>>>>>>> 91008a2 (refactor: getDb/createDb/DrizzleDb を getClient/createClient/DrizzleClient にリネーム)
	});
}
