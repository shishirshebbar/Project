import axios from "axios";

export async function POST(req) {
  try {
    const { videoId, feedback } = await req.json();

    // AI prompt for feedback improvement
    const prompt = `
      Based on the following user feedback, suggest improvements for an AI-generated educational video:
      Feedback: "${feedback}"
      
      Provide specific improvements in terms of:
      - Content accuracy
      - Clarity
      - Engagement
      - Additional key concepts to cover
    `;

    // Call Gemini API to process feedback
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText`,
      {
        prompt,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return Response.json({ improvedSuggestions: response.data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}