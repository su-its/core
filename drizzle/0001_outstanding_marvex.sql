CREATE TYPE "public"."client_type" AS ENUM('student', 'teacher', 'staff', 'other');--> statement-breakpoint
CREATE TYPE "public"."follow_up" AS ENUM('技術部', '生協', '情報基盤センター', '見送り', 'その他');--> statement-breakpoint
CREATE TYPE "public"."resolution_type" AS ENUM('resolved', 'unresolved');--> statement-breakpoint
CREATE TABLE "consultation_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "karte_assigned_members" (
	"karte_id" text NOT NULL,
	"member_id" text NOT NULL,
	CONSTRAINT "karte_assigned_members_pkey" PRIMARY KEY("karte_id","member_id")
);
--> statement-breakpoint
CREATE TABLE "karte_consultation_categories" (
	"karte_id" text NOT NULL,
	"category_id" text NOT NULL,
	CONSTRAINT "karte_consultation_categories_pkey" PRIMARY KEY("karte_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "kartes" (
	"id" text PRIMARY KEY NOT NULL,
	"recorded_at" timestamp NOT NULL,
	"consulted_at" timestamp,
	"last_updated_at" timestamp NOT NULL,
	"client_type" "client_type",
	"client_name" text,
	"client_student_id" char(8),
	"client_affiliation" jsonb,
	"liability_consent" boolean NOT NULL,
	"disclosure_consent" boolean NOT NULL,
	"trouble_details" text NOT NULL,
	"target_device" text,
	"support_content" text NOT NULL,
	"resolution_type" "resolution_type",
	"follow_up" "follow_up",
	"work_duration_minutes" integer
);
--> statement-breakpoint
ALTER TABLE "karte_assigned_members" ADD CONSTRAINT "karte_assigned_members_karte_id_fkey" FOREIGN KEY ("karte_id") REFERENCES "public"."kartes"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "karte_assigned_members" ADD CONSTRAINT "karte_assigned_members_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "karte_consultation_categories" ADD CONSTRAINT "karte_consultation_categories_karte_id_fkey" FOREIGN KEY ("karte_id") REFERENCES "public"."kartes"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "karte_consultation_categories" ADD CONSTRAINT "karte_consultation_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."consultation_categories"("id") ON DELETE restrict ON UPDATE cascade;