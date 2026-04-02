import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";

export default defineConfig({
	resolve: {
		alias: {
			"#domain": fileURLToPath(new URL("./src/domain", import.meta.url)),
			"#application": fileURLToPath(new URL("./src/application", import.meta.url)),
			"#infrastructure": fileURLToPath(new URL("./src/infrastructure", import.meta.url)),
		},
	},
	test: {
		include: ["tests/**/*.integration.test.ts"],
		globalSetup: ["tests/helpers/globalSetup.ts"],
		setupFiles: ["tests/helpers/setupIntegration.ts"],
		testTimeout: 30_000,
		hookTimeout: 30_000,
		fileParallelism: false,
	},
});
