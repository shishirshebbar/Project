"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import HomePage from "./_components/Home";
import { RefreshCcw, BarChart, GraduationCap } from "lucide-react";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Home() {
  const router = useRouter();

  const courses = [
    { title: "Introduction to Programming", description: "Learn the basics of Python & JavaScript.", image: "./python.jpeg" },
    { title: "Mathematics for Data Science", description: "Linear algebra, calculus, & statistics for AI & ML.", image: "./math.jpeg" },
    { title: "Web Development Bootcamp", description: "Master HTML, CSS, and JavaScript.", image: "./web.jpeg" },
    { title: "Cybersecurity Essentials", description: "Understand ethical hacking & encryption.", image: "./cybersecurity.jpeg" },
    { title: "AI and Machine Learning", description: "Deep learning & neural networks.", image: "./ai.jpeg" },
    { title: "Business & Financial Analytics", description: "Market trends & financial strategies.", image: "./business.jpeg" },
  ];

  const learningHoursData = [
    { subject: "Programming", hours: 12 },
    { subject: "Math", hours: 8 },
    { subject: "Web Dev", hours: 10 },
    { subject: "Cybersecurity", hours: 6 },
    { subject: "AI & ML", hours: 9 },
  ];

  const dashboardStats = {
    totalHours: 45,
    creditsEarned: 120,
    videosUnlocked: 8,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#eef2f3] to-[#8e9eab] px-4 text-gray-800 font-sans">
      <HomePage />

      {/* Hero Section */}
      <Card className="w-full max-w-3xl mt-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold tracking-tight text-indigo-700">Welcome to Cognify</CardTitle>
          <p className="text-gray-600 text-lg mt-2">Smarter learning starts with smarter videos.</p>
        </CardHeader>
      </Card>

      {/* How It Works Section */}
      <div className="w-full max-w-3xl mt-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">How Cognify Works</h2>

        {[{
          title: "AI-Generated Video Learning",
          content: "Cognify generates educational videos using AI models. Students can browse available videos, watch limited content for free, and unlock additional videos using credits."
        },
        {
          title: "Earn Credits by Contributing",
          content: "To access more AI-generated videos, students must contribute learning materials (text, PDFs, or images). Approved contributions earn credits to unlock more videos."
        },
        {
          title: "Feedback to Improve AI Content",
          content: "Users can submit feedback on AI-generated videos. Feedback is sent to the AI video generator via OpenAPI to improve future videos."
        }].map((item, idx) => (
          <Card key={idx} className="mb-6 bg-white rounded-xl shadow-md transition-transform hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-600 font-semibold">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 leading-relaxed">
              {item.content}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Study Material Section */}
      <div className="mt-14 w-full max-w-3xl">
        <h2 className="font-bold text-3xl flex justify-between items-center mb-6 text-gray-900">
          📚 Your Study Material
          <Button variant="outline" className="border-primary hover:bg-indigo-100 transition">
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow">
              <img src={course.image} alt={course.title} className="w-full h-36 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-indigo-700">{course.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{course.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Hours Visualization */}
      <div className="mt-14 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">📊 Learning Hours Visualization</h2>
        <Card className="bg-white shadow-md p-6 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <ReBarChart data={learningHoursData}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#6366f1" radius={[5, 5, 0, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Dashboard */}
      <div className="mt-14 w-full max-w-3xl mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">📈 Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col items-center justify-center bg-white shadow-md rounded-xl text-center hover:shadow-lg transition-shadow">
            <GraduationCap className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.totalHours} hrs</h3>
            <p className="text-sm text-gray-600">Total Learning Hours</p>
          </Card>

          <Card className="p-6 flex flex-col items-center justify-center bg-white shadow-md rounded-xl text-center hover:shadow-lg transition-shadow">
            <BarChart className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.creditsEarned}</h3>
            <p className="text-sm text-gray-600">Credits Earned</p>
          </Card>

          <Card className="p-6 flex flex-col items-center justify-center bg-white shadow-md rounded-xl text-center hover:shadow-lg transition-shadow">
            <BarChart className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.videosUnlocked}</h3>
            <p className="text-sm text-gray-600">Videos Unlocked</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
