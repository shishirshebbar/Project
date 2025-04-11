import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Table: Videos
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  topic: text("topic").notNull(),
  complexity: text("complexity").notNull(),
  video_url: text("video_url").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// Table: AI-Generated Content
export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  topic: text("topic").notNull(),
  complexity: text("complexity").notNull(),
  qa: text("qa"),
  notes: text("notes"),
  quiz: text("quiz"),
  flashcards: text("flashcards"),
  created_at: timestamp("created_at").defaultNow(),
});

// Table: Feedback
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  video_id: text("video_id").notNull(),
  feedback: text("feedback").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});