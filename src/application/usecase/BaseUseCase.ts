/**
 * ユースケースの基底インターフェース
 * TInputはユースケースへの入力型
 * TOutputはユースケースからの出力型
 */
export interface IUseCase<TInput, TOutput> {
	execute(input: TInput): Promise<TOutput>;
}
