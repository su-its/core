import type { UnitOfWork } from "#application/UnitOfWork";
import { runInTransaction } from "./client";

/**
 * UnitOfWorkのDrizzle実装
 * AsyncLocalStorageを利用して、トランザクションを処理の流れ全体で共有する
 */
export class DrizzleUnitOfWork implements UnitOfWork {
	async run<T>(fn: () => Promise<T>): Promise<T> {
		return runInTransaction(fn);
	}
}
