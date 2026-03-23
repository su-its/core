import { createMemberUseCases } from "@shizuoka-its/core";

const memberUseCases = createMemberUseCases();

(async () => {
	const result = await memberUseCases.getMemberByEmail
		.execute({ email: "kawaguchi.kinji@shizuoka.ac.jp" })
		.catch((error) => {
			console.error("メンバー情報の取得に失敗しました:", error);
			throw error;
		});
	if (!result.member) {
		console.error("メンバー情報が見つかりませんでした");
		return;
	}

	console.log(result.member);
})().catch((error) => {
	console.error(error);
	process.exit(1);
});
