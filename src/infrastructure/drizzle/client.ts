import { type NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export type DrizzleDb = NodePgDatabase<typeof schema>;

let pool: Pool | null = null;
let testDb: DrizzleDb | null = null;

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

export function getDb(): DrizzleDb {
	if (testDb) {
		return testDb;
	}
	return drizzle(getPool(), { schema });
}

export function setTestDb(db: DrizzleDb): void {
	testDb = db;
}

export function resetTestDb(): void {
	testDb = null;
}
