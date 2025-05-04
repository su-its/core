export class MemberEvent {
	constructor(
		public readonly id: string,
		public readonly memberId: string,
		public readonly eventId: string,
	) {}

	toSnapshot() {
		return {
			id: this.id,
			memberId: this.memberId,
			eventId: this.eventId,
		};
	}
}
