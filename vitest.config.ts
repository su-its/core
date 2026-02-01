import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
	test: {
		globals: true,
		environment: "node",
		include: ["tests/**/*.test.ts"],
		setupFiles: ["tests/setup.ts"],
		env: loadEnv(mode, process.cwd(), ""),
	},
	resolve: {
		alias: {
			"#domain": "./src/domain",
			"#domain/": "./src/domain/",
			"#application": "./src/application",
			"#application/": "./src/application/",
			"#infrastructure": "./src/infrastructure",
			"#infrastructure/": "./src/infrastructure/",
		},
	},
}));
