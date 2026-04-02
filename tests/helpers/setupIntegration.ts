import { beforeEach } from "vite-plus/test";
import "./config";
import { cleanDatabase } from "./db";

beforeEach(async () => {
	await cleanDatabase();
});
