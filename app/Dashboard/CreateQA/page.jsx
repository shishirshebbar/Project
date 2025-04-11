"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GenerateQA() {
  const [topic, setTopic] = useState("");
  const [complexity, setComplexity] = useState("Beginner");
  const [qaPairs, setQaPairs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerateQA = async () => {
    if (!topic.trim()) {
      setMessage("❌ Please enter a topic.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/generate-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, complexity }),
      });

      const data = await response.json();
      if (response.ok) {
        setQaPairs(data.qaPairs);
        setMessage("✅ Q&A generated successfully!");
      } else {
        setMessage("❌ Failed to generate Q&A.");
      }
    } catch (error) {
      setMessage("❌ Error generating Q&A.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-100 px-4 py-10 flex justify-center">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md border border-indigo-200 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          📚 Generate Q&A Pairs
        </h2>

        {message && (
          <p
            className={`text-center mb-4 font-medium ${
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
            placeholder="Enter topic (e.g., Machine Learning Basics)"
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
            onClick={handleGenerateQA}
            disabled={loading}
            className={`w-full text-base font-semibold ${
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Generating..." : "✨ Generate Q&A"}
          </Button>
        </div>

        {qaPairs.length > 0 && (
          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-semibold text-indigo-800 text-center">
              📖 Q&A Results
            </h3>
            {qaPairs.map((qa, index) => (
              <Card
                key={index}
                className="bg-gradient-to-r from-white to-indigo-50 border border-indigo-100 shadow-md transition-transform hover:scale-[1.02]"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-indigo-700">
                    Q{index + 1}: {qa.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-medium text-green-600">💡 Answer:</span>{" "}
                    {qa.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
