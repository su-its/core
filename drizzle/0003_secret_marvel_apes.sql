CREATE TYPE "public"."discord_account_event_name" AS ENUM('DiscordAccountLinked', 'NickNameChanged');--> statement-breakpoint
CREATE TYPE "public"."member_event_name" AS ENUM('MemberRegistered', 'MemberRemoved', 'MemberReregistered', 'MemberUnconfirmed', 'MemberConfirmed', 'InternallyAdvanced', 'FacultyTransferred', 'DepartmentTransferred', 'MajorTransferred', 'StudentIdChanged', 'NameChanged', 'PersonalEmailChanged');--> statement-breakpoint
CREATE TABLE "discord_account_domain_events" (
	"id" uuid PRIMARY KEY NOT NULL,
	"discord_id" text NOT NULL,
	"member_id" text NOT NULL,
	"event_name" "discord_account_event_name" NOT NULL,
	"payload" jsonb NOT NULL,
	"occurred_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_domain_events" (
	"id" uuid PRIMARY KEY NOT NULL,
	"member_id" text NOT NULL,
	"email" text NOT NULL,
	"event_name" "member_event_name" NOT NULL,
	"payload" jsonb NOT NULL,
	"occurred_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE INDEX "discord_account_domain_events_discord_id_idx" ON "discord_account_domain_events" USING btree ("discord_id");--> statement-breakpoint
CREATE INDEX "discord_account_domain_events_member_id_idx" ON "discord_account_domain_events" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "discord_account_domain_events_occurred_at_idx" ON "discord_account_domain_events" USING btree ("occurred_at");--> statement-breakpoint
CREATE INDEX "member_domain_events_member_id_idx" ON "member_domain_events" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "member_domain_events_event_name_idx" ON "member_domain_events" USING btree ("event_name");--> statement-breakpoint
CREATE INDEX "member_domain_events_occurred_at_idx" ON "member_domain_events" USING btree ("occurred_at");