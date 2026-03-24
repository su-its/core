export abstract class ValueObject<T> {
	constructor(protected readonly value: T) {
		this.validate();
	}

	protected abstract validate(): void;

	getValue(): T {
		return this.value;
	}

	equals(vo?: ValueObject<T>): boolean {
		if (vo === null || vo === undefined) {
			return false;
		}
		return JSON.stringify(this.value) === JSON.stringify(vo.value);
	}

	protected throwIfInvalid(isValid: boolean, exception: Error): void {
		if (!isValid) {
			throw exception;
		}
	}
}
