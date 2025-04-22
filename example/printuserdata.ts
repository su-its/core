import { createMemberUseCases, type Member } from "../src/";

const memberUseCases = createMemberUseCases();

(async () => {
	const member: Member | null = await memberUseCases.getMemberByEmail
		.execute({ email: "kawaguchi.kinji@shizuoka.ac.jp" })
		.catch((error) => {
			console.error("メンバー情報の取得に失敗しました:", error);
			throw error;
		});
	if (!member) {
		console.error("メンバー情報が見つかりませんでした");
		return;
	}

	console.log(member);
})();
