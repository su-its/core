import { eq } from "drizzle-orm";
import {
	ActiveMember,
	FormerMember,
	type Member,
	type MemberRepository,
	UnconfirmedMember,
} from "#domain/aggregates/member";
import { Email } from "#domain/aggregates/member/Email";
import { type MemberId, memberId } from "#domain/aggregates/member/MemberId";
import { UniversityEmail } from "#domain/aggregates/member/UniversityEmail";
import { StudentId } from "#domain/shared/StudentId";
import {
	type Affiliation,
	DoctoralAffiliation,
	MasterAffiliation,
	ProfessionalAffiliation,
	UndergraduateAffiliation,
} from "#domain/shared/affiliation/Affiliation";
import { getDb } from "./client";
import { type SerializedAffiliation, members } from "./schema";

// ============================================================================
// Type Definitions
// ============================================================================

type MemberRow = typeof members.$inferSelect;

// ============================================================================
// Domain ↔ DB Mapping
// ============================================================================

function deserializeAffiliation(json: SerializedAffiliation): Affiliation {
	switch (json.type) {
		case "undergraduate":
			return new UndergraduateAffiliation(json.value);
		case "master":
			return new MasterAffiliation(json.value);
		case "doctoral":
			return new DoctoralAffiliation(json.value);
		case "professional":
			return new ProfessionalAffiliation(json.value);
	}
}

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
	if (affiliation instanceof ProfessionalAffiliation) {
		return { type: "professional", value: affiliation.getValue() };
	}
	const _: never = affiliation;
	throw new Error(`Unknown affiliation type: ${_}`);
}

function toDomain(row: MemberRow): Member {
	const id = memberId(row.id);
	const email = new UniversityEmail(row.email);
	const name = row.name;
	const personalEmail = row.personalEmail
		? new Email(row.personalEmail)
		: new Email(row.email);

	switch (row.status) {
		case "active": {
			if (row.affiliation === null || row.studentId === null) {
				throw new Error(
					`データ不整合: status=active だが affiliation または studentId が null (id=${row.id})`,
				);
			}
			return ActiveMember.reconstruct({
				id,
				email,
				name,
				personalEmail,
				studentId: StudentId.fromString(row.studentId),
				affiliation: deserializeAffiliation(row.affiliation),
			});
		}
		case "unconfirmed":
			return UnconfirmedMember.reconstruct({ id, email, name, personalEmail });
		case "former":
			return FormerMember.reconstruct({ id, email, name, personalEmail });
	}
}

// ============================================================================
// Persistence Helpers
// ============================================================================

type MemberInsert = typeof members.$inferInsert;

function toInsertValues(member: Member): MemberInsert {
	const base = {
		id: member.id as string,
		name: member.name,
		email: member.email.getValue(),
		personalEmail: member.personalEmail.getValue(),
		status: member.status,
		updatedAt: new Date().toISOString(),
	};

	switch (member.status) {
		case "active":
			return {
				...base,
				studentId: member.studentId.getValue(),
				affiliation: serializeAffiliation(member.affiliation),
			};
		case "unconfirmed":
		case "former":
			return {
				...base,
				studentId: null,
				affiliation: null,
			};
	}
}

// ============================================================================
// Repository Implementation
// ============================================================================

export class DrizzleMemberRepository implements MemberRepository {
	async findById(id: MemberId): Promise<Member | null> {
		const db = getDb();
		const row = await db.query.members.findFirst({
			where: eq(members.id, id as string),
		});
		if (!row) return null;
		return toDomain(row);
	}

	async findByEmail(email: string): Promise<Member | null> {
		const db = getDb();
		const row = await db.query.members.findFirst({
			where: eq(members.email, email),
		});
		if (!row) return null;
		return toDomain(row);
	}

	async findAll(): Promise<Member[]> {
		const db = getDb();
		const rows = await db.query.members.findMany();
		return rows.map(toDomain);
	}

	async save(member: Member): Promise<void> {
		const db = getDb();
		const values = toInsertValues(member);

		await db
			.insert(members)
			.values(values)
			.onConflictDoUpdate({
				target: members.id,
				set: {
					name: values.name,
					email: values.email,
					personalEmail: values.personalEmail,
					status: values.status,
					studentId: values.studentId,
					affiliation: values.affiliation,
					updatedAt: values.updatedAt,
				},
			});
	}
}
