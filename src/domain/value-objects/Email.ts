export class Email {
	constructor(private value: string) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(value)) {
			throw new Error("Invalid email format");
		}
	}

	getValue() {
		return this.value;
	}
}
