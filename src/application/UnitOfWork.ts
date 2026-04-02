/**
 * 一連の操作をまとめて扱うためのインターフェース
 * 具体的な実装（DBトランザクション等）はInfrastructure層が担当する
 */
export interface UnitOfWork {
	run<T>(fn: () => Promise<T>): Promise<T>;
}
