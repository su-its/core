export class MemberExhibit {
	constructor(
		public readonly id: string,
		public readonly memberId: string,
		public readonly exhibitId: string,
	) {}

	toSnapshot() {
		return {
			id: this.id,
			memberId: this.memberId,
			exhibitId: this.exhibitId,
		};
	}
}
