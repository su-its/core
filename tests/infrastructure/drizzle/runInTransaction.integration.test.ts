import { describe, expect, it } from "vite-plus/test";
import { eq } from "drizzle-orm";
import { getTestClient } from "../../helpers/db";
import { getClient, runInTransaction } from "#infrastructure/drizzle/client";
import { events } from "#infrastructure/drizzle/schema";

function testEvent(id: string, name: string) {
	const now = new Date().toISOString();
	return { id, name, date: now, updatedAt: now };
}

describe("runInTransaction", () => {
	it("複数の書き込みがすべて永続化される", async () => {
		await runInTransaction(async () => {
			const client = getClient();
			await client.insert(events).values(testEvent("test-1", "Event 1"));
			await client.insert(events).values(testEvent("test-2", "Event 2"));
		});

		const db = getTestClient();
		const rows = await db.select().from(events).where(eq(events.id, "test-1"));
		const rows2 = await db.select().from(events).where(eq(events.id, "test-2"));
		expect(rows).toHaveLength(1);
		expect(rows2).toHaveLength(1);
	});

	it("途中で例外が発生したら全て巻き戻る", async () => {
		await expect(
			runInTransaction(async () => {
				const client = getClient();
				await client.insert(events).values(testEvent("test-rollback", "Should not persist"));
				throw new Error("intentional error");
			}),
		).rejects.toThrow("intentional error");

		const db = getTestClient();
		const rows = await db.select().from(events).where(eq(events.id, "test-rollback"));
		expect(rows).toHaveLength(0);
	});

	it("ネスト時に内側のrunInTransactionが新しいトランザクションを開始せず、外側の失敗で全体が巻き戻る", async () => {
		await expect(
			runInTransaction(async () => {
				await runInTransaction(async () => {
					const client = getClient();
					await client.insert(events).values(testEvent("test-nested", "Nested write"));
				});

				throw new Error("outer failure");
			}),
		).rejects.toThrow("outer failure");

		const db = getTestClient();
		const rows = await db.select().from(events).where(eq(events.id, "test-nested"));
		expect(rows).toHaveLength(0);
	});
});
