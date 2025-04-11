import { db } from "@/lib/db";
import { videos } from "@/lib/drizzle/schema";

export async function POST(req) {
  try {
    const { topic, complexity, video_url } = await req.json();

    // Insert video details into the database
    await db.insert(videos).values({
      topic,
      complexity,
      video_url,
    });

    return Response.json({ message: "✅ Video saved successfully!" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}