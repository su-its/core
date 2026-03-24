CREATE TYPE "public"."member_status" AS ENUM('active', 'unconfirmed', 'former');--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "student_id" SET DATA TYPE varchar(8);--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "student_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "status" "member_status" DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "affiliation" jsonb;--> statement-breakpoint
ALTER TABLE "members" DROP COLUMN "department";