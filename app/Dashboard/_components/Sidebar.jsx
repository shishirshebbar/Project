"use client";
import { Coursecount } from "@/app/_context/Coursecount";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Layers,
  MessageCircle,
  HelpCircle,
  PencilLine,
  BookOpenCheck,
  Brain,
  FilePlus
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

function Sidebar() {
  const { totalcourses, settotalcourses } = useContext(Coursecount);
  const menu = [
    {
      name: "Generate Notes",
      icon: FileText, // Represents written notes
      path: "/Dashboard/CreateNotes",
    },
    {
      name: "Generate Flashcards",
      icon: Layers, // Represents stacked cards
      path: "/Dashboard/CreateFlashcards",
    },
    {
      name: "Generate Q&A",
      icon: MessageCircle, // Dialogue style fits Q&A
      path: "/Dashboard/CreateQA",
    },
    {
      name: "Take Quiz",
      icon: Brain, // For testing knowledge
      path: "/Dashboard/Quiz",
    },
    {
      name: "Contribute Notes",
      icon: FilePlus, // Adding content
      path: "/Dashboard/ContributeNotes",
    },
    {
      name: "Feedback",
      icon: PencilLine, // Writing feedback
      path: "/Dashboard/Feedback",
    },
    {
      name: "FAQs",
      icon: HelpCircle, // Standard help icon
      path: "/Dashboard/FAQ",
    },
  ];

  const path = usePathname();
  

  return (
    <div className="h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-xl border-r border-slate-200 flex flex-col justify-between">
      {/* Top */}
      <div>
        <Link href={"/Dashboard/CreateVideo"}>
          <Button className="w-full rounded-xl text-md font-semibold bg-indigo-600 hover:bg-indigo-700 transition">
            🎬 Create Video Content
          </Button>
        </Link>

        <div className="mt-8 space-y-3">
          {menu.map((menu, index) => {
            const isActive = path === menu.path;
            return (
              <Link
                key={index}
                href={menu.path}
                className={`flex items-center  gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-100 text-white font-semibold"
                    : "hover:bg-blue-200 bg-blue-700 text-white"
                }`}
              >
                <menu.icon className="w-5 h-5" />
                <h2 className="text-base">{menu.name}</h2>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom - Credit Info */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md border border-slate-200">
        <h2 className="text-md font-semibold text-gray-800 mb-1">
          🪙 Credit Balance: {10}
        </h2>
        <Progress value={5} />
        <p className="text-xs text-gray-600 mt-1">
          {1} out of 10 credits left
        </p>
        <Link
          href={"/Dashboard/ContributeNotes"}
          className="text-indigo-600 text-sm font-medium mt-3 inline-block hover:underline"
        >
          ⚡ Level up to do more
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
