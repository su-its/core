import { relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

// Members table
export const members = pgTable("members", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }).notNull(),
	studentId: varchar("student_id", { length: 255 }).notNull(),
	department: varchar("department", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	personalEmail: varchar("personal_email", { length: 255 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

// Discord accounts table
export const discordAccounts = pgTable("discord_accounts", {
	id: varchar("discord_id", { length: 255 }).primaryKey(),
	nickName: varchar("nick_name", { length: 255 }).notNull(),
	memberId: uuid("member_id")
		.notNull()
		.references(() => members.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

// Events table
export const events = pgTable("events", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }).notNull(),
	date: timestamp("date").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

// Exhibits table
export const exhibits = pgTable("exhibits", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description"),
	markdownContent: text("markdown_content"),
	url: varchar("url", { length: 2048 }),
	eventId: uuid("event_id")
		.notNull()
		.references(() => events.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

// Lightning talks table
export const lightningTalks = pgTable("lightning_talks", {
	exhibitId: uuid("exhibit_id")
		.primaryKey()
		.references(() => exhibits.id),
	startTime: timestamp("start_time").notNull(),
	duration: integer("duration").notNull(),
	slideUrl: varchar("slide_url", { length: 2048 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

// Member-Event junction table
export const memberEvents = pgTable(
	"member_events",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		memberId: uuid("member_id")
			.notNull()
			.references(() => members.id),
		eventId: uuid("event_id")
			.notNull()
			.references(() => events.id),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.notNull()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		uniqueIndex("member_event_unique").on(table.memberId, table.eventId),
	],
);

// Member-Exhibit junction table
export const memberExhibits = pgTable(
	"member_exhibits",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		memberId: uuid("member_id")
			.notNull()
			.references(() => members.id),
		exhibitId: uuid("exhibit_id")
			.notNull()
			.references(() => exhibits.id),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.notNull()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		uniqueIndex("member_exhibit_unique").on(table.memberId, table.exhibitId),
	],
);

// Relations
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
