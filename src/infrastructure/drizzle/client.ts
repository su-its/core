/// <reference types="node" />
import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";
import * as schema from "./schema";

let client: Sql | null = null;

function getClient(): Sql {
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

export function getDb() {
	return drizzle(getClient(), { schema });
}

export type DrizzleDb = ReturnType<typeof getDb>;
