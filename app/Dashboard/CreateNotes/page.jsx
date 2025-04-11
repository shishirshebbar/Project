"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateNotes() {
  const [topic, setTopic] = useState("");
  const [complexity, setComplexity] = useState("Beginner");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerateNotes = async () => {
    if (!topic.trim()) {
      setMessage("❌ Please enter a topic.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/generate-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, complexity }),
      });

      const data = await response.json();
      if (response.ok) {
        setNotes(data.notes);
        setMessage("✅ Notes generated successfully!");
      } else {
        setMessage(`❌ ${data.error || "Failed to generate notes."}`);
      }
    } catch (error) {
      setMessage("❌ Error generating notes.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!topic.trim() || !notes.trim()) {
      setMessage("❌ Please enter a topic and notes.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/save-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, complexity, notes }),
      });

      if (response.ok) {
        setMessage("✅ Notes saved successfully!");
        setTopic("");
        setNotes("");
      } else {
        setMessage("❌ Failed to save notes.");
      }
    } catch (error) {
      setMessage("❌ Error saving notes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 py-10 px-4 flex justify-center items-start">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md border border-indigo-200 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-6">
          📝 Create Smart Notes
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

          <Textarea
            placeholder="Write your notes here or generate them..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[200px] bg-white text-gray-800 p-4 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <Button
              onClick={handleGenerateNotes}
              disabled={loading}
              className={`w-full md:w-auto text-base font-semibold ${
                loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Generating..." : "✨ Generate Notes"}
            </Button>
            <Button
              onClick={handleSaveNotes}
              disabled={loading}
              className={`w-full md:w-auto text-base font-semibold ${
                loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Saving..." : "💾 Save Notes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
