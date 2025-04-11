import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { topic, complexity } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "❌ Topic is required." }, { status: 400 });
    }

    // Enforce JSON formatting in the prompt
    const prompt = `
      Generate exactly 5 flashcards on the topic "${topic}" at a ${complexity} level.
      Each flashcard should be in JSON format with:
      - "question": A short quiz question.
      - "answer": A concise answer.
      
      Respond **ONLY** with a valid JSON array, like this:
      [
        { "question": "What is ...?", "answer": "..." },
        { "question": "Explain ...?", "answer": "..." }
      ]
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });

    const responseText = result.response.candidates[0].content.parts[0].text.trim();

    let flashcards;
    try {
      flashcards = JSON.parse(responseText);
      if (!Array.isArray(flashcards)) throw new Error("Invalid JSON format");
    } catch (error) {
      console.error("❌ AI did not return valid JSON:", responseText);
      flashcards = [{ question: "⚠️ Error", answer: "AI response was not properly formatted." }];
    }

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error("❌ Error generating flashcards:", error);
    return NextResponse.json({ error: "Failed to generate flashcards." }, { status: 500 });
  }
}
