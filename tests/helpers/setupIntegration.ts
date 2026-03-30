import { beforeEach } from "vite-plus/test";
import { TEST_DATABASE_URL, cleanDatabase } from "./db";

// プロダクションコードの getClient() がテスト用DBに接続するよう環境変数を設定
process.env.DATABASE_URL = TEST_DATABASE_URL;

beforeEach(async () => {
	await cleanDatabase();
});
