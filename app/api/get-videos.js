import { db } from "@/lib/db";
import { videos } from "@/lib/drizzle/schema";

export async function GET() {
  try {
    // Fetch all videos from the database
    const allVideos = await db.select().from(videos);

    return Response.json({ videos: allVideos });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}