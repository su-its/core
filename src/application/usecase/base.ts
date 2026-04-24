import type { UnitOfWork } from "../UnitOfWork";

/**
 * ユースケースの基底抽象クラス
 * TInputはユースケースへの入力型
 * TOutputはユースケースからの出力型
 */
export abstract class IUseCase<Input, Output> {
	/**
	 * ユースケースのビジネスロジックを実行する
	 * トランザクションなしで実行されるため、読み取り専用のUseCaseはこちらを使う
	 * 複数のDB書き込みを安全にまとめたい場合は run() を使うこと
	 */
	abstract execute(input: Input): Promise<Output>;

	/**
	 * UnitOfWorkで囲んでexecuteを実行する
	 * トランザクション内で全てのDB操作がまとめて成功/失敗する
	 * 複数の集約をまたぐ書き込み操作がある場合に使用する
	 *
	 * 注意:
	 * - execute()内で外部API呼び出し（Discord API等）を行うと、
	 *   その応答待ちの間トランザクションが開きっぱなしになる
	 *   外部連携はトランザクション完了後に行うこと
	 * - トランザクションがロールバックされてもメモリ上のドメインオブジェクトは
	 *   元に戻らない。execute()内で取得・変更したドメインオブジェクトを
	 *   ロールバック後に再利用しないこと
	 */
	async run(input: Input, unitOfWork: UnitOfWork): Promise<Output> {
		return unitOfWork.run(() => this.execute(input));
	}
}
