import { spawn } from "child_process";

export async function POST(req) {
  try {
    const { text } = await req.json();

    console.log("🚀 Converting text to speech...");

    const pythonProcess = spawn("python3", ["scripts/text_to_speech.py", text]);

    let responseData = "";

    pythonProcess.stdout.on("data", (data) => {
      responseData += data.toString();
    });

    return new Promise((resolve) => {
      pythonProcess.on("close", async () => {
        try {
          const audioFile = responseData.trim();
          resolve(Response.json({ audioUrl: `/uploads/${audioFile}` }));
        } catch (error) {
          console.error("❌ Error:", error);
          resolve(Response.json({ error: "Failed to process audio." }, { status: 500 }));
        }
      });
    });
  } catch (error) {
    console.error("❌ API Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
