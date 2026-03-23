import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
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
import type { Affiliation } from "#domain/shared/affiliation/Affiliation";

// ============================================================================
// Enums
// ============================================================================

export const memberStatus = pgEnum("member_status", [
	"active",
	"unconfirmed",
	"former",
]);

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
