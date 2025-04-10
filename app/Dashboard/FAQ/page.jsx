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
      answer: "Cognify is an AI-powered learning platform that generates educational videos. Students can earn credits by contributing learning materials, which they can use to access more video content.",
    },
    {
      question: "How does the AI-generated video system work?",
      answer: "Our platform uses AI models to create educational videos based on various topics. The generated videos provide structured explanations and visual learning experiences.",
    },
    {
      question: "How can I earn credits to unlock more videos?",
      answer: "Students earn credits by contributing learning materials such as notes, articles, or other study resources. Once approved, these contributions help unlock additional AI-generated content.",
    },
    {
      question: "How do I submit learning materials?",
      answer: "You can upload learning materials through the 'Contribute' section in your account. Approved contributions will be made available to other students on the platform.",
    },
    {
      question: "Can I provide feedback on AI-generated videos?",
      answer: "Yes, Cognify has a feedback form where users can submit suggestions. Feedback is processed using an API to improve future AI-generated video content.",
    },
    {
      question: "Is there a limit to how many videos I can watch?",
      answer: "Free users have access to a limited number of AI-generated videos. To unlock more, users need to contribute learning materials and earn credits.",
    },
    {
      question: "Do I need an account to access Cognify?",
      answer: "Yes, you must create an account to access AI-generated videos, contribute learning materials, and track your earned credits.",
    },
    {
      question: "What happens if my submitted material is rejected?",
      answer: "If your contribution does not meet the guidelines, it may be rejected. You will receive feedback on why it was not accepted and how you can improve it for resubmission.",
    },
    {
      question: "Is Cognify free to use?",
      answer: "Cognify offers free access to limited AI-generated videos. Additional content can be unlocked through contributions, and premium features may be available in the future.",
    },
    {
      question: "How do I contact support?",
      answer: "You can contact support through the 'Help' section on the website or send an inquiry via our support email. We are available to assist with any technical issues or questions.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
        Frequently Asked Questions
      </h1>

      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        {faqs.map((faq, index) => (
          <Card key={index} className="border border-gray-200">
            <CardHeader
              className="flex justify-between items-center cursor-pointer p-4 text-lg font-semibold text-gray-800 hover:bg-gray-100 transition duration-200"
              onClick={() => toggleAccordion(index)}
            >
              <CardTitle>{faq.question}</CardTitle>
              <span className={`text-2xl transition-transform ${openIndex === index ? "rotate-180" : ""}`}>
                &#9660;
              </span>
            </CardHeader>
            {openIndex === index && (
              <CardContent className="p-4 text-gray-700">
                {faq.answer}
              </CardContent>
            )}
          </Card>
        ))}

        <div className="mt-8 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;