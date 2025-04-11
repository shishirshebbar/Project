CREATE TABLE "content" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic" text NOT NULL,
	"complexity" text NOT NULL,
	"qa" text,
	"notes" text,
	"quiz" text,
	"flashcards" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"video_id" text NOT NULL,
	"feedback" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic" text NOT NULL,
	"complexity" text NOT NULL,
	"video_url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
