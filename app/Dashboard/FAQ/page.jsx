"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Cognify?",
      answer:
        "Cognify is an AI-powered learning platform that generates educational videos. Students can earn credits by contributing learning materials, which they can use to access more video content.",
    },
    {
      question: "How does the AI-generated video system work?",
      answer:
        "Our platform uses AI models to create educational videos based on various topics. The generated videos provide structured explanations and visual learning experiences.",
    },
    {
      question: "How can I earn credits to unlock more videos?",
      answer:
        "Students earn credits by contributing learning materials such as notes, articles, or other study resources. Once approved, these contributions help unlock additional AI-generated content.",
    },
    {
      question: "How do I submit learning materials?",
      answer:
        "You can upload learning materials through the 'Contribute' section in your account. Approved contributions will be made available to other students on the platform.",
    },
    {
      question: "Can I provide feedback on AI-generated videos?",
      answer:
        "Yes, Cognify has a feedback form where users can submit suggestions. Feedback is processed using an API to improve future AI-generated video content.",
    },
    {
      question: "Is there a limit to how many videos I can watch?",
      answer:
        "Free users have access to a limited number of AI-generated videos. To unlock more, users need to contribute learning materials and earn credits.",
    },
    {
      question: "Do I need an account to access Cognify?",
      answer:
        "Yes, you must create an account to access AI-generated videos, contribute learning materials, and track your earned credits.",
    },
    {
      question: "What happens if my submitted material is rejected?",
      answer:
        "If your contribution does not meet the guidelines, it may be rejected. You will receive feedback on why it was not accepted and how you can improve it for resubmission.",
    },
    {
      question: "Is Cognify free to use?",
      answer:
        "Cognify offers free access to limited AI-generated videos. Additional content can be unlocked through contributions, and premium features may be available in the future.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact support through the 'Help' section on the website or send an inquiry via our support email. We are available to assist with any technical issues or questions.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-16 px-4 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-extrabold text-indigo-800 text-center mb-12 tracking-tight drop-shadow-sm">
         Frequently Asked Questions
      </h1>

      <div className="max-w-5xl w-full bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl p-10 space-y-6 border border-gray-200">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            className="border border-gray-200 shadow-sm transition-transform duration-300 hover:scale-[1.01] rounded-xl"
          >
            <CardHeader
              className="flex justify-between items-center cursor-pointer p-5 bg-white rounded-t-xl hover:bg-indigo-50 transition-all"
              onClick={() => toggleAccordion(index)}
            >
              <CardTitle className="text-lg font-semibold text-gray-800">
                {faq.question}
              </CardTitle>
              <span
                className={`text-2xl text-indigo-500 transform transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </CardHeader>
            {openIndex === index && (
              <CardContent className="p-5 bg-gray-50 rounded-b-xl text-gray-700 border-t border-gray-100">
                {faq.answer}
              </CardContent>
            )}
          </Card>
        ))}

        <Separator className="my-6" />

        <div className="text-center">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-200">
            📩 Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
