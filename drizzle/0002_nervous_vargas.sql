CREATE TABLE "discord_account_domain_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"discord_id" text NOT NULL,
	"member_id" text NOT NULL,
	"event_name" varchar(64) NOT NULL,
	"payload" jsonb NOT NULL,
	"occurred_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_domain_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" text NOT NULL,
	"email" text NOT NULL,
	"event_name" varchar(64) NOT NULL,
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