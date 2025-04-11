import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { topic, complexity } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "❌ Topic is required." }, { status: 400 });
    }

    const prompt = `
      Generate **only** a JSON array of Q&A pairs for the topic: "${topic}".
      Complexity Level: ${complexity}.

      Format example:
      [
        { "question": "What is Machine Learning?", "answer": "Machine learning is..." },
        { "question": "How does it work?", "answer": "It works by..." }
      ]

      Do NOT include any explanations, introductions, or additional text. Only return a valid JSON array.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Ensure correct model
    const result = await model.generateContent(prompt);

    // ✅ Extract and parse the AI response properly
    const rawResponse = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    let qaPairs;
    try {
      qaPairs = JSON.parse(rawResponse);
    } catch (error) {
      console.error("❌ Failed to parse AI response as JSON:", rawResponse);
      return NextResponse.json({ error: "AI response was not properly formatted." }, { status: 500 });
    }

    return NextResponse.json({ qaPairs });
  } catch (error) {
    console.error("❌ Error generating Q&A:", error);
    return NextResponse.json({ error: "Failed to generate Q&A." }, { status: 500 });
  }
}
