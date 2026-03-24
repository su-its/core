CREATE TABLE "discord_accounts" (
	"discord_id" text PRIMARY KEY NOT NULL,
	"nick_name" text NOT NULL,
	"member_id" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"date" timestamp(3) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exhibits" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"url" text,
	"event_id" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"markdown_content" text
);
--> statement-breakpoint
CREATE TABLE "lightning_talks" (
	"exhibit_id" text PRIMARY KEY NOT NULL,
	"start_time" timestamp(3) NOT NULL,
	"duration" integer NOT NULL,
	"slide_url" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_events" (
	"id" text PRIMARY KEY NOT NULL,
	"member_id" text NOT NULL,
	"event_id" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_exhibits" (
	"id" text PRIMARY KEY NOT NULL,
	"member_id" text NOT NULL,
	"exhibit_id" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"student_id" text NOT NULL,
	"department" text NOT NULL,
	"email" text NOT NULL,
	"personal_email" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "discord_accounts" ADD CONSTRAINT "discord_accounts_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "exhibits" ADD CONSTRAINT "exhibits_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "lightning_talks" ADD CONSTRAINT "lightning_talks_exhibit_id_fkey" FOREIGN KEY ("exhibit_id") REFERENCES "public"."exhibits"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "member_events" ADD CONSTRAINT "member_events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "member_events" ADD CONSTRAINT "member_events_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "member_exhibits" ADD CONSTRAINT "member_exhibits_exhibit_id_fkey" FOREIGN KEY ("exhibit_id") REFERENCES "public"."exhibits"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "member_exhibits" ADD CONSTRAINT "member_exhibits_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "member_events_member_id_event_id_key" ON "member_events" USING btree ("member_id" text_ops,"event_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "member_exhibits_member_id_exhibit_id_key" ON "member_exhibits" USING btree ("member_id" text_ops,"exhibit_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "members_email_key" ON "members" USING btree ("email" text_ops);