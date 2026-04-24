/// <reference types="node" />
import { AsyncLocalStorage } from "node:async_hooks";
import type { PgDatabase } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js/session";
import postgres, { type Sql } from "postgres";
import * as schema from "./schema";

let client: Sql | null = null;

export type DrizzleClient = PgDatabase<PostgresJsQueryResultHKT, typeof schema>;

function getSqlClient(): Sql {
	if (!client) {
		const connectionString = process.env.DATABASE_URL;
		if (!connectionString) {
			throw new Error("DATABASE_URL environment variable is not set");
		}
		// Supabase の Transaction pool mode は prepared statement をサポートしないため無効化
		client = postgres(connectionString, { prepare: false });
	}
	return client;
}

function createClient(): DrizzleClient {
	return drizzle(getSqlClient(), { schema });
}

const transactionContext = new AsyncLocalStorage<DrizzleClient>();

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
		return transactionContext.run(tx, fn);
	});
}
