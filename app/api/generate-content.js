import axios from "axios";

export async function POST(req) {
  try {
    const { topic, complexity } = await req.json();

    const prompt = `
      Generate structured educational content on "${topic}" at a "${complexity}" level.
      Include the following sections:
      1. Q&A (5 questions with answers)
      2. Summary Notes (Key concepts in 5-6 bullet points)
      3. Quiz (3 multiple-choice questions with answers)
      4. Flashcards (3 key terms with definitions)
    `;

    // Call Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText`,
      { prompt, max_tokens: 500 },
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return Response.json({ content: response.data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}