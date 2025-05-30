export class DiscordAccount {
	constructor(
		readonly id: string, // Discord ID
		private nickName: string,
		private memberId: string,
	) {}

	getNickName() {
		return this.nickName;
	}

	getMemberId() {
		return this.memberId;
	}

	setNickName(newNickName: string) {
		this.nickName = newNickName;
	}

	toSnapshot() {
		return {
			id: this.id,
			nickName: this.nickName,
			memberId: this.memberId,
		};
	}
}
