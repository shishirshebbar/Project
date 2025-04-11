import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { content } from "@/lib/drizzle/schema";

export async function POST(req) {
  try {
    const { topic, complexity, notes } = await req.json();

    if (!topic || !notes) {
      return NextResponse.json({ error: "Topic and notes are required." }, { status: 400 });
    }

    // Insert into database
    await db.insert(content).values({
      topic,
      complexity,
      notes,
      created_at: new Date(),
    });

    return NextResponse.json({ message: "Notes saved successfully!" });
  } catch (error) {
    console.error("Error saving notes:", error);
    return NextResponse.json({ error: "Failed to save notes." }, { status: 500 });
  }
}
