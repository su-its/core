import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parseEnv } from "node:util";

const TEST_ENV_PATH = fileURLToPath(new URL("../../.env.test", import.meta.url));

function loadTestEnv(): Record<string, string | undefined> {
	return parseEnv(readFileSync(TEST_ENV_PATH, "utf8"));
}

function requireEnv(env: Record<string, string | undefined>, name: string): string {
	const value = env[name];
	if (!value) {
		throw new Error(`${name} is not set in .env.test`);
	}
	return value;
}

const loadedEnv = loadTestEnv();

for (const [key, value] of Object.entries(loadedEnv)) {
	process.env[key] = value;
}

export const testConfig = {
	db: {
		host: requireEnv(loadedEnv, "POSTGRES_HOST"),
		port: Number(requireEnv(loadedEnv, "POSTGRES_PORT")),
		name: requireEnv(loadedEnv, "POSTGRES_DB"),
		user: requireEnv(loadedEnv, "POSTGRES_USER"),
		password: requireEnv(loadedEnv, "POSTGRES_PASSWORD"),
	},
} as const;

const databaseUrl = new URL(
	`postgresql://${testConfig.db.host}:${testConfig.db.port}/${testConfig.db.name}`,
);
databaseUrl.username = testConfig.db.user;
databaseUrl.password = testConfig.db.password;

export const TEST_DATABASE_URL = databaseUrl.toString();

process.env.DATABASE_URL = TEST_DATABASE_URL;

export const testProcessEnv: NodeJS.ProcessEnv = {
	...process.env,
	...loadedEnv,
	DATABASE_URL: TEST_DATABASE_URL,
};
