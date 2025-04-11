import { spawn } from "child_process";

export async function POST(req) {
  try {
    const { text, images = [] } = await req.json(); // Ensure images is always an array

    if (!Array.isArray(images)) {
      throw new Error("images must be an array");
    }

    console.log("🚀 Creating video from images & audio...");

    const pythonProcess = spawn("python3", ["scripts/create_video.py", text, ...images]);

    let responseData = "";

    pythonProcess.stdout.on("data", (data) => {
      responseData += data.toString();
    });

    return new Promise((resolve) => {
      pythonProcess.on("close", async () => {
        try {
          const videoFile = responseData.trim();
          resolve(Response.json({ videoUrl: `/uploads/${videoFile}` }));
        } catch (error) {
          console.error("❌ Error:", error);
          resolve(Response.json({ error: "Failed to process video." }, { status: 500 }));
        }
      });
    });
  } catch (error) {
    console.error("❌ API Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
