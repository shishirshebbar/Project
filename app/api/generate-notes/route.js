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
      Generate detailed study notes on "${topic}".
      Complexity Level: ${complexity}.
      
      Format:
      - **Introduction**
      - **Key Concepts**
      - **Examples**
      - **Summary**
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // ✅ Ensure correct model
    const result = await model.generateContent(prompt);

    // ✅ Extract response correctly
    const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response from AI.";

    return NextResponse.json({ notes: responseText });
  } catch (error) {
    console.error("❌ Error generating notes:", error);
    return NextResponse.json({ error: "Failed to generate notes." }, { status: 500 });
  }
}
