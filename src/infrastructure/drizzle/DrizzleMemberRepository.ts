import { v4 as uuid } from "uuid";
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
import { type Recorded, notRecorded, recorded } from "#domain/shared/Recorded";
import { StudentId } from "#domain/shared/StudentId";
import type { CompleteAffiliation } from "#domain/shared/affiliation/Affiliation";
import { getDb } from "./client";
import { memberDomainEvents, members } from "./schema";
import { serializeMemberEventPayload } from "./serializeMemberEvent";

// ============================================================================
// Type Definitions
// ============================================================================

type MemberRow = typeof members.$inferSelect;

// ============================================================================
// Domain ↔ DB Mapping
// ============================================================================

function toDomain(row: MemberRow): Member {
  const id = memberId(row.id);
  const email = new UniversityEmail(row.email);
  const name = row.name;
  const personalEmail: Recorded<Email> =
    row.personalEmail !== null ? recorded(new Email(row.personalEmail)) : notRecorded();

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
        affiliation: row.affiliation as CompleteAffiliation,
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
    personalEmail:
      member.personalEmail.type === "recorded" ? member.personalEmail.value.getValue() : null,
    status: member.status,
    updatedAt: new Date().toISOString(),
  };

  switch (member.status) {
    case "active":
      return {
        ...base,
        studentId: member.studentId.getValue(),
        affiliation: member.affiliation,
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

  async findByEmail(email: UniversityEmail): Promise<Member | null> {
    const db = getDb();
    const row = await db.query.members.findFirst({
      where: eq(members.email, email.getValue()),
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
    const events = member.getDomainEvents();

    await db.transaction(async (tx) => {
      await tx
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

      if (events.length > 0) {
        await tx.insert(memberDomainEvents).values(
          events.map((event) => ({
            id: uuid(),
            memberId: event.id as string,
            email: event.email.getValue(),
            eventName: event.eventName,
            payload: serializeMemberEventPayload(event),
            occurredAt: event.occurredAt.toISOString(),
          })),
        );
      }
    });
  }
}
