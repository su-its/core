/**
 * ユースケースの基底抽象クラス
 * TInputはユースケースへの入力型
 * TOutputはユースケースからの出力型
 */
export abstract class IUseCase<Input, Output> {
	abstract execute(input: Input): Promise<Output>;
}
