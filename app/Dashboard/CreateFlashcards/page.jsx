"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateFlashcards() {
  const [topic, setTopic] = useState("");
  const [complexity, setComplexity] = useState("Beginner");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerateFlashcards = async () => {
    if (!topic.trim()) {
      setMessage("❌ Please enter a topic.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, complexity }),
      });

      const data = await response.json();
      if (response.ok) {
        setFlashcards(data.flashcards);
        setMessage("✅ Flashcards generated successfully!");
      } else {
        setMessage("❌ Failed to generate flashcards.");
      }
    } catch (error) {
      setMessage("❌ Error generating flashcards.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-blue-50 py-10 px-4 flex justify-center items-start">
      <div className="max-w-3xl w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-indigo-200">
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-6 tracking-tight">
          📚 Generate Flashcards
        </h2>

        {message && (
          <p
            className={`text-center mb-4 text-sm font-medium ${
              message.startsWith("✅")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="space-y-5">
          <Input
            type="text"
            placeholder="Enter topic (e.g., Newton's Laws)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />

          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Beginner">🟢 Beginner</option>
            <option value="Intermediate">🟡 Intermediate</option>
            <option value="Advanced">🔴 Advanced</option>
          </select>

          <Button
            onClick={handleGenerateFlashcards}
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold ${
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } transition`}
          >
            {loading ? "Generating..." : "✨ Generate Flashcards"}
          </Button>
        </div>

        {flashcards.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-indigo-800 text-center mb-4">
              📌 Your Flashcards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flashcards.map((card, index) => (
                <div
                  key={index}
                  className="p-5 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition"
                >
                  <p className="font-semibold text-gray-800 mb-2">
                    🔹 {card.question}
                  </p>
                  <p className="text-gray-700 text-sm">💡 {card.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
