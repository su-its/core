import { AsyncLocalStorage } from "node:async_hooks";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let pool: Pool | null = null;

function getPool(): Pool {
	if (!pool) {
		const connectionString = process.env.DATABASE_URL;
		if (!connectionString) {
			throw new Error("DATABASE_URL environment variable is not set");
		}
		pool = new Pool({ connectionString });
	}
	return pool;
}

function createClient() {
	return drizzle(getPool(), { schema });
}

export type DrizzleClient = ReturnType<typeof createClient>;

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
		return transactionContext.run(tx as unknown as DrizzleClient, fn);
	});
}
