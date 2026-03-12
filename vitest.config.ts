import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["tests/**/*.test.ts"],
	},
	resolve: {
		alias: {
			"#domain": fileURLToPath(new URL("./src/domain", import.meta.url)),
			"#application": fileURLToPath(
				new URL("./src/application", import.meta.url),
			),
			"#infrastructure": fileURLToPath(
				new URL("./src/infrastructure", import.meta.url),
			),
		},
	},
});
