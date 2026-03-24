import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
	boolean,
	char,
	foreignKey,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import { ASSIGNEE_TYPES } from "#domain/aggregates/karte/Assignee";
import { CLIENT_TYPES } from "#domain/aggregates/karte/Client";
import { CONSULTATION_CATEGORIES } from "#domain/aggregates/karte/ConsultationCategory";
import { CONSULTED_AT_PRECISIONS } from "#domain/aggregates/karte/ConsultedAt";
import { FOLLOW_UP_OPTIONS } from "#domain/aggregates/karte/FollowUp";
import { RESOLUTION_TYPES } from "#domain/aggregates/karte/Resolution";
import type { Affiliation } from "#domain/shared/affiliation/Affiliation";

// ============================================================================
// Enums
// ============================================================================

/** readonly配列をpgEnumが要求するmutableタプルに変換する */
function toEnumValues<T extends string>(
	values: readonly T[],
): [T, ...T[]] {
	return [...values] as [T, ...T[]];
}

export const memberStatus = pgEnum("member_status", [
	"active",
	"unconfirmed",
	"former",
]);

export const clientTypeEnum = pgEnum("client_type", toEnumValues(CLIENT_TYPES));

export const resolutionTypeEnum = pgEnum(
	"resolution_type",
	toEnumValues(RESOLUTION_TYPES),
);

export const followUpEnum = pgEnum("follow_up", toEnumValues(FOLLOW_UP_OPTIONS));

export const consultedAtPrecisionEnum = pgEnum(
	"consulted_at_precision",
	toEnumValues(CONSULTED_AT_PRECISIONS),
);

export const consultationCategoryEnum = pgEnum(
	"consultation_category",
	toEnumValues(CONSULTATION_CATEGORIES.map((c) => c.id)),
);

// ============================================================================
// Tables (introspected from production database)
// ============================================================================

export const members = pgTable(
	"members",
	{
		id: text().primaryKey().notNull(),
		name: text().notNull(),
		studentId: varchar("student_id", { length: 8 }),
		email: text().notNull(),
		personalEmail: text("personal_email"),
		status: memberStatus().notNull().default("active"),
		affiliation: jsonb().$type<Affiliation>(),
		createdAt: timestamp({ mode: "string" })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp({ mode: "string" }).notNull(),
	},
	(table) => [
		uniqueIndex("members_email_key").using(
			"btree",
			table.email.asc().nullsLast().op("text_ops"),
		),
	],
);

export const discordAccounts = pgTable(
	"discord_accounts",
	{
		discordId: text("discord_id").primaryKey().notNull(),
		nickName: text("nick_name").notNull(),
		memberId: text("member_id").notNull(),
		createdAt: timestamp({ precision: 3, mode: "string" })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "discord_accounts_member_id_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
	],
);

export const events = pgTable("events", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	date: timestamp({ precision: 3, mode: "string" }).notNull(),
	createdAt: timestamp({ precision: 3, mode: "string" })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
});

export const exhibits = pgTable(
	"exhibits",
	{
		id: text().primaryKey().notNull(),
		name: text().notNull(),
		description: text(),
		url: text(),
		eventId: text("event_id").notNull(),
		createdAt: timestamp({ precision: 3, mode: "string" })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
		markdownContent: text("markdown_content"),
	},
	(table) => [
		foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "exhibits_event_id_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
	],
);

export const lightningTalks = pgTable(
	"lightning_talks",
	{
		exhibitId: text("exhibit_id").primaryKey().notNull(),
		startTime: timestamp("start_time", {
			precision: 3,
			mode: "string",
		}).notNull(),
		duration: integer().notNull(),
		slideUrl: text("slide_url"),
		createdAt: timestamp({ precision: 3, mode: "string" })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.exhibitId],
			foreignColumns: [exhibits.id],
			name: "lightning_talks_exhibit_id_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
	],
);

export const memberEvents = pgTable(
	"member_events",
	{
		id: text().primaryKey().notNull(),
		memberId: text("member_id").notNull(),
		eventId: text("event_id").notNull(),
		createdAt: timestamp({ precision: 3, mode: "string" })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
	},
	(table) => [
		uniqueIndex("member_events_member_id_event_id_key").using(
			"btree",
			table.memberId.asc().nullsLast().op("text_ops"),
			table.eventId.asc().nullsLast().op("text_ops"),
		),
		foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "member_events_event_id_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
		foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "member_events_member_id_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
	],
);

export const memberExhibits = pgTable(
	"member_exhibits",
	{
		id: text().primaryKey().notNull(),
		memberId: text("member_id").notNull(),
		exhibitId: text("exhibit_id").notNull(),
		createdAt: timestamp({ precision: 3, mode: "string" })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
	},
	(table) => [
		uniqueIndex("member_exhibits_member_id_exhibit_id_key").using(
			"btree",
			table.memberId.asc().nullsLast().op("text_ops"),
			table.exhibitId.asc().nullsLast().op("text_ops"),
		),
		foreignKey({
			columns: [table.exhibitId],
			foreignColumns: [exhibits.id],
			name: "member_exhibits_exhibit_id_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
		foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "member_exhibits_member_id_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
	],
);

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey().notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", {
		withTimezone: true,
		mode: "string",
	}),
	startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
		.defaultNow()
		.notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

// ============================================================================
// Karte Tables
// ============================================================================

export const kartes = pgTable("kartes", {
	id: text().primaryKey(),
	recordedAt: timestamp("recorded_at").notNull(),
	/** NULL = notRecorded */
	consultedAt: timestamp("consulted_at"),
	/** consultedAtの精度。consultedAtがNULLならNULL */
	consultedAtPrecision: consultedAtPrecisionEnum("consulted_at_precision"),
	lastUpdatedAt: timestamp("last_updated_at").notNull(),
	/** NULL = notRecorded */
	clientType: clientTypeEnum("client_type"),
	/** NULL when client is notRecorded */
	clientName: text("client_name"),
	/** Only for student clients; 学籍番号は8文字固定 */
	clientStudentId: char("client_student_id", { length: 8 }),
	/** Only for student clients; Affiliation as JSONB */
	clientAffiliation: jsonb("client_affiliation").$type<Affiliation>(),
	liabilityConsent: boolean("liability_consent").notNull(),
	disclosureConsent: boolean("disclosure_consent").notNull(),
	/** 空配列 = notRecorded */
	categoryIds: consultationCategoryEnum("category_ids").array().notNull().default([]),
	/** NULL = notRecorded */
	troubleDetails: text("trouble_details"),
	/** NULL = notRecorded */
	targetDevice: text("target_device"),
	/** NULL = notRecorded */
	supportContent: text("support_content"),
	/** NULL = notRecorded */
	resolutionType: resolutionTypeEnum("resolution_type"),
	/** Only for unresolved; NULL = notRecorded or N/A */
	followUp: followUpEnum("follow_up"),
	/** NULL = notRecorded */
	workDurationMinutes: integer("work_duration_minutes"),
});

export const assigneeTypeEnum = pgEnum(
	"assignee_type",
	toEnumValues(ASSIGNEE_TYPES),
);

export const karteAssignees = pgTable(
	"karte_assignees",
	{
		karteId: text("karte_id").notNull(),
		assigneeType: assigneeTypeEnum("assignee_type").notNull(),
		/** resolved の場合のみ。メンバーID */
		memberId: text("member_id"),
		/** unresolved の場合のみ。対応者名 */
		assigneeName: text("assignee_name"),
	},
	(table) => [
		foreignKey({
			columns: [table.karteId],
			foreignColumns: [kartes.id],
			name: "karte_assignees_karte_id_fkey",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),
		foreignKey({
			columns: [table.memberId],
			foreignColumns: [members.id],
			name: "karte_assignees_member_id_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
	],
);

// ============================================================================
// Relations
// ============================================================================

export const membersRelations = relations(members, ({ many }) => ({
	discordAccounts: many(discordAccounts),
	memberEvents: many(memberEvents),
	memberExhibits: many(memberExhibits),
}));

export const discordAccountsRelations = relations(
	discordAccounts,
	({ one }) => ({
		member: one(members, {
			fields: [discordAccounts.memberId],
			references: [members.id],
		}),
	}),
);

export const eventsRelations = relations(events, ({ many }) => ({
	memberEvents: many(memberEvents),
	exhibits: many(exhibits),
}));

export const exhibitsRelations = relations(exhibits, ({ one, many }) => ({
	event: one(events, {
		fields: [exhibits.eventId],
		references: [events.id],
	}),
	lightningTalk: one(lightningTalks, {
		fields: [exhibits.id],
		references: [lightningTalks.exhibitId],
	}),
	memberExhibits: many(memberExhibits),
}));

export const lightningTalksRelations = relations(lightningTalks, ({ one }) => ({
	exhibit: one(exhibits, {
		fields: [lightningTalks.exhibitId],
		references: [exhibits.id],
	}),
}));

export const memberEventsRelations = relations(memberEvents, ({ one }) => ({
	member: one(members, {
		fields: [memberEvents.memberId],
		references: [members.id],
	}),
	event: one(events, {
		fields: [memberEvents.eventId],
		references: [events.id],
	}),
}));

export const memberExhibitsRelations = relations(memberExhibits, ({ one }) => ({
	member: one(members, {
		fields: [memberExhibits.memberId],
		references: [members.id],
	}),
	exhibit: one(exhibits, {
		fields: [memberExhibits.exhibitId],
		references: [exhibits.id],
	}),
}));

// ============================================================================
// Karte Relations
// ============================================================================

export const kartesRelations = relations(kartes, ({ many }) => ({
	karteAssignees: many(karteAssignees),
}));

export const karteAssigneesRelations = relations(
	karteAssignees,
	({ one }) => ({
		karte: one(kartes, {
			fields: [karteAssignees.karteId],
			references: [kartes.id],
		}),
		member: one(members, {
			fields: [karteAssignees.memberId],
			references: [members.id],
		}),
	}),
);
