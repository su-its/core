/**
 * Member集約リモデリング — Phase 2 データ移行スクリプト
 *
 * 既存のdepartment列からstatus/affiliationを設定する。
 * 使い捨てスクリプト。移行完了後に削除する。
 *
 * 使い方:
 *   DATABASE_URL="postgresql://..." npx tsx scripts/migrate-members.ts
 */

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
	DoctoralAffiliation,
	MasterAffiliation,
	UndergraduateAffiliation,
} from "#domain/shared/affiliation/Affiliation";
import type { Affiliation } from "#domain/shared/affiliation/Affiliation";
import type { SerializedAffiliation } from "../src/infrastructure/drizzle/schema";
import { members } from "../src/infrastructure/drizzle/schema";

// ============================================================================
// Types
// ============================================================================

type MemberRow = typeof members.$inferSelect;

type MigrationResult =
	| { type: "migrated"; id: string; name: string; status: string }
	| { type: "deleted"; id: string; name: string }
	| { type: "skipped"; id: string; name: string; reason: string };

// ============================================================================
// Year Calculation
// ============================================================================

const CURRENT_YEAR = 2025;

function extractEnrollmentYear(email: string): number | null {
	// メールアドレスからyy部分を抽出: name.XX@shizuoka.ac.jp
	const match = email.match(/\.(\d{2})a?@shizuoka\.ac\.jp$/);
	if (!match) return null;
	return 2000 + Number(match[1]);
}

function calculateUndergraduateYear(enrollmentYear: number): 1 | 2 | 3 | 4 {
	const years = CURRENT_YEAR - enrollmentYear + 1;
	if (years >= 4) return 4;
	if (years <= 1) return 1;
	return years as 1 | 2 | 3 | 4;
}

function calculateMasterYear(enrollmentYear: number): 1 | 2 {
	const years = CURRENT_YEAR - enrollmentYear + 1;
	return years >= 2 ? 2 : 1;
}

function calculateDoctoralYear(enrollmentYear: number): 1 | 2 | 3 {
	const years = CURRENT_YEAR - enrollmentYear + 1;
	if (years >= 3) return 3;
	if (years <= 1) return 1;
	return years as 1 | 2 | 3;
}

// ============================================================================
// Affiliation Mapping
// ============================================================================

function serializeAffiliation(affiliation: Affiliation): SerializedAffiliation {
	if (affiliation instanceof UndergraduateAffiliation) {
		return { type: "undergraduate", value: affiliation.getValue() };
	}
	if (affiliation instanceof MasterAffiliation) {
		return { type: "master", value: affiliation.getValue() };
	}
	if (affiliation instanceof DoctoralAffiliation) {
		return { type: "doctoral", value: affiliation.getValue() };
	}
	const _: never = affiliation;
	throw new Error(`Unknown affiliation type: ${_}`);
}

type DepartmentMapping = {
	status: "active" | "former";
	buildAffiliation: (enrollmentYear: number) => SerializedAffiliation | null;
};

const DEPARTMENT_MAP: Record<string, DepartmentMapping> = {
	CS: {
		status: "active",
		buildAffiliation: (ey) => ({
			type: "undergraduate",
			value: {
				faculty: "情報学部",
				department: "情報科学科",
				year: calculateUndergraduateYear(ey),
			},
		}),
	},
	BI: {
		status: "active",
		buildAffiliation: (ey) => ({
			type: "undergraduate",
			value: {
				faculty: "情報学部",
				department: "行動情報学科",
				year: calculateUndergraduateYear(ey),
			},
		}),
	},
	IA: {
		status: "active",
		buildAffiliation: (ey) => ({
			type: "undergraduate",
			value: {
				faculty: "情報学部",
				department: "情報社会学科",
				year: calculateUndergraduateYear(ey),
			},
		}),
	},
	ALUMNI: {
		status: "former",
		buildAffiliation: () => null,
	},
	GRADUATE: {
		status: "active",
		buildAffiliation: () => null, // 研究科・専攻の特定が必要 → 手動
	},
	OTHERS: {
		status: "active",
		buildAffiliation: () => null, // 学科の特定が必要 → 手動
	},
};

// ============================================================================
// Individual Overrides
// ============================================================================

type IndividualOverride = {
	status: "active" | "unconfirmed" | "former" | "delete";
	affiliation: SerializedAffiliation | null;
};

/** メールアドレスをキーに個別対応を定義 */
const INDIVIDUAL_OVERRIDES: Record<string, IndividualOverride> = {
	// GRADUATE → 髙橋陽拓のみactive、他はformer
	"takahashi.haruhiro.19@shizuoka.ac.jp": {
		status: "active",
		affiliation: {
			type: "master",
			value: {
				school: "総合科学技術研究科",
				major: "情報学専攻",
				course: "基盤情報学コース",
				year: 2,
			},
		},
	},
	"oshima.kenta.20@shizuoka.ac.jp": { status: "former", affiliation: null },
	"hashimoto.seiya.19@shizuoka.ac.jp": {
		status: "former",
		affiliation: null,
	},
	"maekawa.yuki.20@shizuoka.ac.jp": { status: "former", affiliation: null },
	"amaya.takeru.19@shizuoka.ac.jp": { status: "former", affiliation: null },

	// OTHERS → 大芝さんはformer、他はunconfirmed
	"oshiba.shumpei.21@shizuoka.ac.jp": { status: "former", affiliation: null },
	"ota.ayato.21@shizuoka.ac.jp": { status: "unconfirmed", affiliation: null },
	"watanabe.yuki.23@shizuoka.ac.jp": {
		status: "unconfirmed",
		affiliation: null,
	},
	"nozaki.enjin.24@shizuoka.ac.jp": {
		status: "unconfirmed",
		affiliation: null,
	},
	"shimao.aozora.18@shizuoka.ac.jp": {
		status: "unconfirmed",
		affiliation: null,
	},
	"kotani.takumi.24@shizuoka.ac.jp": {
		status: "unconfirmed",
		affiliation: null,
	},

	// test user → 削除
	"test@shizuoka.ac.jp": { status: "delete", affiliation: null },
};

// ============================================================================
// Migration Logic
// ============================================================================

function migrateRow(row: MemberRow): {
	status: string;
	affiliation: SerializedAffiliation | null;
	skipped: boolean;
	deleted: boolean;
	reason?: string;
} {
	// 個別対応を優先
	const override = INDIVIDUAL_OVERRIDES[row.email];
	if (override) {
		if (override.status === "delete") {
			return {
				status: "",
				affiliation: null,
				skipped: false,
				deleted: true,
			};
		}
		return {
			status: override.status,
			affiliation: override.affiliation,
			skipped: false,
			deleted: false,
		};
	}

	const mapping = DEPARTMENT_MAP[row.department];
	if (!mapping) {
		return {
			status: row.status ?? "active",
			affiliation: null,
			skipped: true,
			deleted: false,
			reason: `不明なdepartment: ${row.department}`,
		};
	}

	if (mapping.status === "former") {
		return {
			status: "former",
			affiliation: null,
			skipped: false,
			deleted: false,
		};
	}

	const enrollmentYear = extractEnrollmentYear(row.email);
	if (enrollmentYear === null) {
		return {
			status: mapping.status,
			affiliation: null,
			skipped: true,
			deleted: false,
			reason: `メールアドレスから入学年を抽出できません: ${row.email}`,
		};
	}

	const affiliation = mapping.buildAffiliation(enrollmentYear);
	if (affiliation === null) {
		return {
			status: mapping.status,
			affiliation: null,
			skipped: true,
			deleted: false,
			reason: `${row.department}の所属は手動設定が必要です`,
		};
	}

	return {
		status: mapping.status,
		affiliation,
		skipped: false,
		deleted: false,
	};
}

// ============================================================================
// Main
// ============================================================================

async function main() {
	const connectionString = process.env.DATABASE_URL;
	if (!connectionString) {
		console.error("DATABASE_URL が設定されていません");
		process.exit(1);
	}

	const pool = new Pool({ connectionString });
	const db = drizzle(pool);

	try {
		const rows = await db.select().from(members);
		console.log(`対象メンバー: ${rows.length}件\n`);

		const results: MigrationResult[] = [];

		for (const row of rows) {
			const migration = migrateRow(row);

			if (migration.skipped) {
				results.push({
					type: "skipped",
					id: row.id,
					name: row.name,
					reason: migration.reason ?? "",
				});
				continue;
			}

			if (migration.deleted) {
				await db.delete(members).where(eq(members.id, row.id));
				results.push({ type: "deleted", id: row.id, name: row.name });
				continue;
			}

			await db
				.update(members)
				.set({
					status: migration.status as "active" | "unconfirmed" | "former",
					affiliation: migration.affiliation,
					updatedAt: new Date().toISOString(),
				})
				.where(eq(members.id, row.id));

			results.push({
				type: "migrated",
				id: row.id,
				name: row.name,
				status: migration.status,
			});
		}

		// Report
		const migrated = results.filter((r) => r.type === "migrated");
		const deleted = results.filter((r) => r.type === "deleted");
		const skipped = results.filter((r) => r.type === "skipped");

		console.log(`=== 移行完了: ${migrated.length}件 ===`);
		for (const r of migrated) {
			if (r.type === "migrated") {
				console.log(`  ✓ ${r.name} → ${r.status}`);
			}
		}

		if (deleted.length > 0) {
			console.log(`\n=== 削除: ${deleted.length}件 ===`);
			for (const r of deleted) {
				console.log(`  ✗ ${r.name}`);
			}
		}

		if (skipped.length > 0) {
			console.log(`\n=== スキップ: ${skipped.length}件（手動対応が必要） ===`);
			for (const r of skipped) {
				if (r.type === "skipped") {
					console.log(`  ✗ ${r.name}: ${r.reason}`);
				}
			}
		}
	} finally {
		await pool.end();
	}
}

main();
