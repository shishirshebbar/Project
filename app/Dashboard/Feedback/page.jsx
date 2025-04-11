"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "@heroicons/react/24/solid";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (rating === 0 || !feedback.trim()) {
      setMessage("❌ Please provide a rating and feedback.");
      return;
    }

    setLoading(true);
    setMessage("");

    setTimeout(() => {
      setLoading(false);
      setMessage("✅ Thank you for your feedback!");
      setName("");
      setFeedback("");
      setRating(0);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 text-center transition-all">
       <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
        📝 Submit Feedback
      </h2>

      <p className="text-gray-600 mb-6 text-md">
        We’d love to hear your thoughts on the platform or the video!
      </p>

      {message && (
        <p className="text-md font-medium text-gray-700 bg-slate-100 py-2 px-4 rounded-md mb-4 inline-block shadow-sm">
          {message}
        </p>
      )}

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Enter your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-md mx-auto p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-6">
        <p className="text-gray-700 text-lg font-medium mb-3">
          How would you rate your experience?
        </p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon
              key={i}
              className={`h-7 w-7 cursor-pointer transition-transform duration-200 ${
                i <= rating
                  ? "text-yellow-400 scale-110"
                  : "text-gray-300 hover:text-yellow-300 hover:scale-105"
              }`}
              onClick={() => setRating(i)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <Textarea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full max-w-md mx-auto p-3 rounded-xl shadow-sm resize-none min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition duration-200 shadow-md"
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </Button>
    </div>
    </div>
  );
}
