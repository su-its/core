import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.test.ts"],
	},
	resolve: {
		alias: {
			"#domain": new URL("./src/domain", import.meta.url).pathname,
			"#application": new URL("./src/application", import.meta.url).pathname,
			"#infrastructure": new URL("./src/infrastructure", import.meta.url)
				.pathname,
		},
	},
});
