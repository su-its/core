import { createMemberUseCases } from "../src/";

const memberUseCases = createMemberUseCases();

(async () => {
	const member = await memberUseCases.getMemberByEmail
		.execute("kawaguchi.kinji@shizuoka.ac.jp")
		.catch((error) => {
			console.error("メンバー情報の取得に失敗しました:", error);
			throw error;
		});

	console.log(member);
})();
