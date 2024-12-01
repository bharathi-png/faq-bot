"use client";

import { useState } from "react";
import type { FAQKey } from "./data/faq";

// Predefined list of frequently asked questions about LangChain
const FAQ_QUESTIONS: FAQKey[] = [
  "What is LangChain?",
  "How do I install LangChain?",
  "What are the core components of LangChain?",
  "What is a Chain in LangChain?",
  "What are prompt templates?",
  "How do I implement chat functionality?",
];

export default function Home() {
  // State management for user input, bot response, and loading status
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission and API interaction
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      if (response.ok) {
        setAnswer(data.answer);
      } else {
        setAnswer(`Error: ${data.error}`);
      }
    } catch (error) {
      setAnswer("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          LangChain FAQ Bot
        </h1>

        <section className="mb-8 bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">
            Sample Questions
          </h2>
          <div className="flex flex-wrap gap-2">
            {FAQ_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => setQuestion(q)}
                className="bg-gray-700/50 hover:bg-gray-600/50 rounded-full px-4 py-2 text-sm text-blue-300 transition-all duration-200 hover:shadow-md border border-gray-600"
              >
                {q}
              </button>
            ))}
          </div>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about LangChain..."
              className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800/50 shadow-lg transition-all duration-200 text-gray-100 placeholder-gray-400"
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                <span>Thinking...</span>
              </div>
            ) : (
              "Ask Question"
            )}
          </button>
        </form>

        {answer && (
          <section className="mt-8 bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Answer</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {answer}
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
