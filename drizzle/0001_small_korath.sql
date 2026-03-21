CREATE TYPE "public"."member_status" AS ENUM('active', 'unconfirmed', 'former');--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "status" "member_status" DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "affiliation" jsonb;