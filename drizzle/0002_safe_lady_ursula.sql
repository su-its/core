CREATE TYPE "public"."assignee_type" AS ENUM('resolved', 'unresolved');--> statement-breakpoint
CREATE TYPE "public"."client_type" AS ENUM('student', 'teacher', 'staff', 'other');--> statement-breakpoint
CREATE TYPE "public"."consultation_category" AS ENUM('wifi_eduroam', 'wifi_success', 'wifi_smartphone', 'usage_mac', 'usage_fs', 'usage_vpn', 'usage_mail', 'usage_gakujo', 'usage_onedrive', 'usage_printer', 'usage_vm', 'usage_ms_software', 'hardware_pc', 'problem_credential', 'problem_windows', 'problem_linux', 'programming', 'rent', 'other');--> statement-breakpoint
CREATE TYPE "public"."follow_up" AS ENUM('技術部', '生協', '情報基盤センター', '見送り', 'その他');--> statement-breakpoint
CREATE TYPE "public"."resolution_type" AS ENUM('resolved', 'unresolved');--> statement-breakpoint
CREATE TABLE "karte_assignees" (
	"karte_id" text NOT NULL,
	"assignee_type" "assignee_type" NOT NULL,
	"member_id" text,
	"assignee_name" text
);
--> statement-breakpoint
CREATE TABLE "karte_consultation_categories" (
	"karte_id" text NOT NULL,
	"category_id" "consultation_category" NOT NULL,
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
	"trouble_details" text,
	"target_device" text,
	"support_content" text,
	"resolution_type" "resolution_type",
	"follow_up" "follow_up",
	"work_duration_minutes" integer
);
--> statement-breakpoint
ALTER TABLE "karte_assignees" ADD CONSTRAINT "karte_assignees_karte_id_fkey" FOREIGN KEY ("karte_id") REFERENCES "public"."kartes"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "karte_assignees" ADD CONSTRAINT "karte_assignees_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "karte_consultation_categories" ADD CONSTRAINT "karte_consultation_categories_karte_id_fkey" FOREIGN KEY ("karte_id") REFERENCES "public"."kartes"("id") ON DELETE cascade ON UPDATE cascade;