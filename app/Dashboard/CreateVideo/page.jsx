"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddVideo() {
  const [subject, setSubject] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    if (!subject.trim()) return;

    setLoading(true);
    setShowVideo(false);

    setTimeout(() => {
      setShowVideo(true);
      setLoading(false);
    }, 15000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 text-center transition-all">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6">
          🎥 Create an Educational Video
        </h2>

        <Input
          type="text"
          placeholder="Enter any subject (e.g., Python, Math, Science)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mb-4 shadow-sm focus:ring-2 focus:ring-indigo-400"
        />

        <Button
          onClick={handleEnter}
          disabled={loading}
          className={`w-full font-semibold text-base ${
            loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "⏳ Loading..." : " Enter"}
        </Button>

        {loading && (
          <p className="mt-4 text-gray-600 text-sm animate-pulse">
            Preparing your video magic...
          </p>
        )}

        {showVideo && (
          <div className="mt-8">
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <video
                controls
                className="w-full rounded-lg border border-gray-100"
              >
                <source src="/Python.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="mt-3 text-gray-700 text-sm">
              ✅ Now playing: <span className="font-medium">{subject}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
