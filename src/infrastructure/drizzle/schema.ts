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
	primaryKey,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import type {
	PartialDoctoralAffiliationValue,
	PartialMasterAffiliationValue,
	PartialProfessionalAffiliationValue,
	PartialUndergraduateAffiliationValue,
} from "#domain/shared/affiliation/partialUniversityStructure";
import type {
	DoctoralAffiliationValue,
	MasterAffiliationValue,
	ProfessionalAffiliationValue,
	UndergraduateAffiliationValue,
} from "#domain/shared/affiliation/universityStructure";

// ============================================================================
// Tables (introspected from production database)
// ============================================================================

export const members = pgTable(
	"members",
	{
		id: text().primaryKey().notNull(),
		name: text().notNull(),
		studentId: text("student_id").notNull(),
		department: text().notNull(),
		email: text().notNull(),
		personalEmail: text("personal_email"),
		createdAt: timestamp({ precision: 3, mode: "string" })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
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

// ============================================================================
// Karte Enums
// ============================================================================

export const clientTypeEnum = pgEnum("client_type", [
	"student",
	"teacher",
	"staff",
	"other",
]);

export const resolutionTypeEnum = pgEnum("resolution_type", [
	"resolved",
	"unresolved",
]);

export const followUpEnum = pgEnum("follow_up", [
	"技術部",
	"生協",
	"情報基盤センター",
	"見送り",
	"その他",
]);

// ============================================================================
// Karte Tables
// ============================================================================

/** Affiliationのシリアライズ形式 — ドメインの値型で判別共用体にする */
export type SerializedAffiliation =
	| { type: "undergraduate"; value: UndergraduateAffiliationValue | PartialUndergraduateAffiliationValue }
	| { type: "master"; value: MasterAffiliationValue | PartialMasterAffiliationValue }
	| { type: "doctoral"; value: DoctoralAffiliationValue | PartialDoctoralAffiliationValue }
	| { type: "professional"; value: ProfessionalAffiliationValue | PartialProfessionalAffiliationValue };

export const kartes = pgTable("kartes", {
	id: text().primaryKey(),
	recordedAt: timestamp("recorded_at").notNull(),
	/** NULL = notRecorded */
	consultedAt: timestamp("consulted_at"),
	lastUpdatedAt: timestamp("last_updated_at").notNull(),
	/** NULL = notRecorded */
	clientType: clientTypeEnum("client_type"),
	/** NULL when client is notRecorded */
	clientName: text("client_name"),
	/** Only for student clients; 学籍番号は8文字固定 */
	clientStudentId: char("client_student_id", { length: 8 }),
	/** Only for student clients; Affiliation as JSONB */
	clientAffiliation: jsonb("client_affiliation").$type<SerializedAffiliation>(),
	liabilityConsent: boolean("liability_consent").notNull(),
	disclosureConsent: boolean("disclosure_consent").notNull(),
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

export const consultationCategories = pgTable("consultation_categories", {
	id: text().primaryKey(),
	displayName: text("display_name").notNull(),
	createdAt: timestamp().default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp().notNull(),
});

export const karteConsultationCategories = pgTable(
	"karte_consultation_categories",
	{
		karteId: text("karte_id").notNull(),
		categoryId: text("category_id").notNull(),
	},
	(table) => [
		primaryKey({
			columns: [table.karteId, table.categoryId],
			name: "karte_consultation_categories_pkey",
		}),
		foreignKey({
			columns: [table.karteId],
			foreignColumns: [kartes.id],
			name: "karte_consultation_categories_karte_id_fkey",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),
		foreignKey({
			columns: [table.categoryId],
			foreignColumns: [consultationCategories.id],
			name: "karte_consultation_categories_category_id_fkey",
		})
			.onUpdate("cascade")
			.onDelete("restrict"),
	],
);

export const assigneeTypeEnum = pgEnum("assignee_type", [
	"resolved",
	"unresolved",
]);

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
	karteConsultationCategories: many(karteConsultationCategories),
	karteAssignees: many(karteAssignees),
}));

export const consultationCategoriesRelations = relations(
	consultationCategories,
	({ many }) => ({
		karteConsultationCategories: many(karteConsultationCategories),
	}),
);

export const karteConsultationCategoriesRelations = relations(
	karteConsultationCategories,
	({ one }) => ({
		karte: one(kartes, {
			fields: [karteConsultationCategories.karteId],
			references: [kartes.id],
		}),
		category: one(consultationCategories, {
			fields: [karteConsultationCategories.categoryId],
			references: [consultationCategories.id],
		}),
	}),
);

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
