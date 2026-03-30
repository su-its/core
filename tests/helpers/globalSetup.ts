import { setupTestDatabase, teardownTestDatabase } from "./db";

export async function setup() {
	await setupTestDatabase();
}

export async function teardown() {
	await teardownTestDatabase();
}
