"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [complexity, setComplexity] = useState("Beginner");
  const [quiz, setQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      setMessage("❌ Please enter a topic.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, complexity }),
      });

      const data = await response.json();
      if (response.ok) {
        setQuiz(data.quiz);
        setUserAnswers({});
        setScore(null);
        setMessage("✅ Quiz generated successfully!");
      } else {
        setMessage("❌ Failed to generate quiz.");
      }
    } catch (error) {
      setMessage("❌ Error generating quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: answer });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quiz.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 py-10 px-4 flex justify-center items-start">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md border border-indigo-200 rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        🎯 Take a Quiz
      </h2>

      {message && (
        <p className="text-center text-lg font-medium mb-4 text-blue-600">
          {message}
        </p>
      )}

      <div className="space-y-4 mb-6">
        <Input
          type="text"
          placeholder="Enter topic (e.g., Machine Learning Basics)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400"
        />

        <select
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <Button
          onClick={handleGenerateQuiz}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </Button>
      </div>

      {quiz.length > 0 && (
        <div className="mt-6 space-y-6">
          {quiz.map((q, index) => (
            <div
              key={index}
              className="p-5 bg-white rounded-xl shadow-md border border-slate-200"
            >
              <p className="font-semibold text-lg text-gray-800 mb-3">
                {index + 1}. {q.question}
              </p>
              <div className="grid grid-cols-1 gap-3">
                {q.options.map((option, i) => (
                  <label
                    key={i}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition hover:bg-slate-100 ${
                      userAnswers[index] === option
                        ? "bg-blue-50 border-blue-400"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={userAnswers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <Button
            onClick={handleSubmitQuiz}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-all"
          >
            Submit Quiz
          </Button>

          {score !== null && (
            <p className="mt-6 text-2xl font-bold text-center text-green-700">
              🎯 Your Score: {score} / {quiz.length}
            </p>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
