import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { topic, complexity } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "❌ Topic is required." },
        { status: 400 }
      );
    }

    const prompt = `
      Generate a multiple-choice quiz on "${topic}" at a ${complexity} level.
      - Provide 5 questions.
      - Each question should have 4 answer options.
      - Indicate the correct answer.

      Format the response as a valid JSON array:
      [
        {
          "question": "What is AI?",
          "options": ["Algorithm", "Artificial Intelligence", "Automation", "None"],
          "correctAnswer": "Artificial Intelligence"
        }
      ]

      Only return a JSON array. No extra text, no explanations, no markdown formatting.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);

    let rawResponse =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // ✅ Strip markdown-style code block (e.g., ```json ... ```)
    rawResponse = rawResponse.trim().replace(/^```(?:json)?\s*|```$/g, "");

    let quiz;
    try {
      quiz = JSON.parse(rawResponse);
    } catch (error) {
      console.error("❌ Failed to parse AI response as JSON:", rawResponse);
      return NextResponse.json(
        { error: "AI response was not properly formatted." },
        { status: 500 }
      );
    }

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error("❌ Error generating quiz:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz." },
      { status: 500 }
    );
  }
}
