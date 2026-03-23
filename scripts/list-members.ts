/**
 * リポジトリ経由で全メンバーを取得し、ドメインモデルの情報を一覧表示する。
 *
 * 使い方:
 *   DATABASE_URL="postgresql://..." npx tsx scripts/list-members.ts
 */

import type {
	ActiveMember,
	FormerMember,
	Member,
	UnconfirmedMember,
} from "#domain/aggregates/member";
import {
	DoctoralAffiliation,
	MasterAffiliation,
	ProfessionalAffiliation,
	UndergraduateAffiliation,
} from "#domain/shared/affiliation/Affiliation";
import { DrizzleMemberRepository } from "../src/infrastructure/drizzle/DrizzleMemberRepository";

function formatAffiliation(member: ActiveMember): string {
	const aff = member.affiliation;
	const val = aff.getValue();
	if (aff instanceof UndergraduateAffiliation) {
		const v = val as ReturnType<typeof aff.getValue>;
		return `学部 | ${v.faculty} ${v.department ?? v.program ?? ""} ${v.course ?? ""} ${v.year}年`;
	}
	if (aff instanceof MasterAffiliation) {
		const v = val as ReturnType<typeof aff.getValue>;
		return `修士 | ${v.school} ${v.major} ${v.course ?? ""} ${v.year}年`;
	}
	if (aff instanceof DoctoralAffiliation) {
		const v = val as ReturnType<typeof aff.getValue>;
		return `博士 | ${v.school} ${v.major} ${v.year}年`;
	}
	if (aff instanceof ProfessionalAffiliation) {
		const v = val as ReturnType<typeof aff.getValue>;
		return `専門職 | ${v.school} ${v.major} ${v.year}年`;
	}
	return "不明";
}

function formatMember(member: Member): string {
	const base = `[${member.status.padEnd(11)}] ${member.name.padEnd(12)} | ${member.email.getValue()}`;

	switch (member.status) {
		case "active":
			return `${base} | 学籍: ${member.studentId.getValue()} | ${formatAffiliation(member)}`;
		case "unconfirmed":
		case "former":
			return base;
	}
}

async function main() {
	if (!process.env.DATABASE_URL) {
		console.error("DATABASE_URL が設定されていません");
		process.exit(1);
	}

	const repo = new DrizzleMemberRepository();
	const members = await repo.findAll();

	console.log(`全メンバー: ${members.length}件\n`);

	const active = members.filter(
		(m): m is ActiveMember => m.status === "active",
	);
	const unconfirmed = members.filter(
		(m): m is UnconfirmedMember => m.status === "unconfirmed",
	);
	const former = members.filter(
		(m): m is FormerMember => m.status === "former",
	);

	console.log(`=== 室員 (active): ${active.length}件 ===`);
	for (const m of active) {
		console.log(`  ${formatMember(m)}`);
	}

	console.log(`\n=== 未確認 (unconfirmed): ${unconfirmed.length}件 ===`);
	for (const m of unconfirmed) {
		console.log(`  ${formatMember(m)}`);
	}

	console.log(`\n=== 元室員 (former): ${former.length}件 ===`);
	for (const m of former) {
		console.log(`  ${formatMember(m)}`);
	}

	process.exit(0);
}

main();
