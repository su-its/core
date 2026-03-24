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
		include: ["tests/**/*.test.ts"],
	},
	lint: {
		ignorePatterns: ["dist/**", "drizzle/**", "example/**"],
		options: {
			typeAware: true,
			typeCheck: true,
		},
	},
	fmt: {
		ignorePatterns: ["dist/**", "drizzle/**", "package.json", "package-lock.json"],
		useTabs: true,
	},
	pack: {
		entry: ["src/index.ts"],
		format: ["esm", "cjs"],
		dts: true,
		sourcemap: true,
		unbundle: true,
	},
});
