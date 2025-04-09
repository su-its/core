export class DiscordAccount {
	constructor(
		readonly id: string, // Discord ID
		public nickName: string,
		public memberId: string,
	) {}

	setNickName(newNickName: string) {
		this.nickName = newNickName;
	}
}
