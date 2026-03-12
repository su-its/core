import { ValueObject } from "#domain/base/ValueObject";
import { InvalidConsultationCategoryException } from "#domain/exceptions";

type ConsultationCategoryValue = {
	/** カテゴリID */
	readonly id: string;
	/** 表示名 */
	readonly displayName: string;
};

/**
 * 相談カテゴリ
 *
 * PC相談室で扱うトラブルの分類タグ。
 * IDと表示名のペアで構成され、追加はできるが削除はできない（履歴整合性のため）。
 */
export class ConsultationCategory extends ValueObject<ConsultationCategoryValue> {
	protected validate(): void {
		this.throwIfInvalid(
			this.value.id.trim().length > 0,
			new InvalidConsultationCategoryException("IDが空です"),
		);
		this.throwIfInvalid(
			this.value.displayName.trim().length > 0,
			new InvalidConsultationCategoryException("表示名が空です"),
		);
	}

	get id(): string {
		return this.value.id;
	}

	get displayName(): string {
		return this.value.displayName;
	}
}
