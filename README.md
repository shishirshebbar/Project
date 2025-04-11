# 🎓 Cognify

**Smarter learning starts with smarter videos.**

---

## 🧠 Project Overview

**Cognify** is an AI-powered platform designed to revolutionize the student learning experience by generating intelligent, topic-based video content and interactive study materials.

Students enter a **topic** and **complexity level**, and Cognify instantly generates:

- 🎥 An AI-generated educational **video** using the Invideo API
- 📝 Auto-generated **notes**, **flashcards**, **quizzes**, and **Q&A** using Google's Gemini API
- 📈 A **feedback form** to evaluate the learning content and improve future video generations via Gemini

---

## 🚀 Key Features

- 🔹 **Topic-based video content** generation
- 🔹 **Adaptive complexity levels** (Beginner, Intermediate, Advanced)
- 🔹 **Interactive quizzes** with auto-evaluation
- 🔹 **Concise notes** and **flashcards** to enhance retention
- 🔹 **Dynamic Q&A** for deeper understanding
- 🔹 **AI-driven feedback loop** that regenerates enhanced videos based on user feedback

---

## 🧰 Tech Stack

| Category      | Tools Used                             |
|---------------|----------------------------------------|
| Frontend      | Next.js, Tailwind CSS, ShadCN UI       |
| Backend       | Next.js (App Router)                   |
| Authentication| Clerk                                  |
| AI Services   | Google Gemini API, Invideo API         |
| Database      | PostgreSQL (via Supabase)              |
| ORM           | Drizzle ORM                            |
| Media Storage | Cloudinary                             |
| Language      | JavaScript (Full Stack)                |

---

## 🔄 Flow

1. **User enters topic and selects complexity level**
2. **Gemini API** generates:
   - Quizzes
   - Notes
   - Flashcards
   - Q&A
3. **Invideo API** creates a tailored educational video
4. User interacts with the learning materials
5. **Feedback form** is submitted and processed by Gemini
6. A **new version** of the video/content is generated based on feedback

---

## 🎯 Vision

Cognify empowers students by making learning content:

- More **personalized**
- More **interactive**
- And **continuously improving** through AI

> “Ready to make learning smarter? Let’s get started!”
