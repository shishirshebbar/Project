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
    { 
      title: "Introduction to Programming", 
      description: "Learn the basics of Python & JavaScript.", 
      image: "./python.jpeg" 
    },
    { 
      title: "Mathematics for Data Science", 
      description: "Linear algebra, calculus, & statistics for AI & ML.", 
      image: "./math.jpeg" 
    },
    { 
      title: "Web Development Bootcamp", 
      description: "Master HTML, CSS, and JavaScript.", 
      image: "./web.jpeg" 
    },
    { 
      title: "Cybersecurity Essentials", 
      description: "Understand ethical hacking & encryption.", 
      image: "./cybersecurity.jpeg" 
    },
    { 
      title: "AI and Machine Learning", 
      description: "Deep learning & neural networks.", 
      image: "./ai.jpeg" 
    },
    { 
      title: "Business & Financial Analytics", 
      description: "Market trends & financial strategies.", 
      image: "./business.jpeg" 
    },
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <HomePage />

      {/* Hero Section */}
      <Card className="w-full max-w-3xl mt-10 bg-white shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to Cognify</CardTitle>
          <p className="text-gray-600 text-lg">Smarter learning starts with smarter videos.</p>
        </CardHeader>
      </Card>

      {/* How It Works Section */}
      <div className="w-full max-w-3xl mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">How Cognify Works</h2>

        <Card className="mb-6 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">AI-Generated Video Learning</CardTitle>
          </CardHeader>
          <CardContent>
            Cognify generates educational videos using AI models. Students can browse available videos, watch limited content for free, and unlock additional videos using credits.
          </CardContent>
        </Card>

        <Card className="mb-6 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Earn Credits by Contributing</CardTitle>
          </CardHeader>
          <CardContent>
            To access more AI-generated videos, students must contribute learning materials (text, PDFs, or images). Approved contributions earn credits to unlock more videos.
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Feedback to Improve AI Content</CardTitle>
          </CardHeader>
          <CardContent>
            Users can submit feedback on AI-generated videos. Feedback is sent to the AI video generator via OpenAPI to improve future videos.
          </CardContent>
        </Card>
      </div>

      {/* Study Material Section */}
      <div className="mt-10 w-full max-w-3xl">
        <h2 className="font-bold text-2xl flex justify-between items-center mb-5">
          Your Study Material
          <Button variant="outline" className="border-primary">
            <RefreshCcw /> Refresh
          </Button>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="p-5 border border-gray-300 rounded-lg shadow-sm flex flex-col items-start bg-white">
              <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded-lg mb-3" />
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{course.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Hours Visualization */}
      <div className="mt-10 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">📊 Learning Hours Visualization</h2>
        <Card className="bg-white shadow-sm p-5">
          <ResponsiveContainer width="100%" height={300}>
            <ReBarChart data={learningHoursData}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#4F46E5" radius={[5, 5, 0, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Interactive Dashboard */}
      <div className="mt-10 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">📈 Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card className="p-5 flex flex-col items-center justify-center text-center bg-white shadow-sm">
            <GraduationCap className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-xl font-semibold">{dashboardStats.totalHours} hrs</h3>
            <p className="text-sm text-gray-600">Total Learning Hours</p>
          </Card>

          <Card className="p-5 flex flex-col items-center justify-center text-center bg-white shadow-sm">
            <BarChart className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-xl font-semibold">{dashboardStats.creditsEarned}</h3>
            <p className="text-sm text-gray-600">Credits Earned</p>
          </Card>

          <Card className="p-5 flex flex-col items-center justify-center text-center bg-white shadow-sm">
            <BarChart className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-xl font-semibold">{dashboardStats.videosUnlocked}</h3>
            <p className="text-sm text-gray-600">Videos Unlocked</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
