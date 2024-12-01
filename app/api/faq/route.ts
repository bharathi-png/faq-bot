/**
 * API route handler for the FAQ bot
 * This file handles question processing using both a static FAQ database and LangChain's LLM
 */

import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { NextResponse } from "next/server";
import { FAQ_DB } from "@/app/data/faq";

// Validate OpenAI API key presence
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

// Initialize OpenAI LLM with temperature 0.7 for balanced creativity/consistency
const llm = new OpenAI({
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Template for structuring the LLM prompt with consistent format
const qaTemplate = `Question: {question}

Please provide a helpful and accurate answer to this question. If you don't know the answer, please say so.

Answer:`;

const prompt = new PromptTemplate({
  template: qaTemplate,
  inputVariables: ["question"],
});

// Initialize LangChain for processing questions
const qaChain = new LLMChain({ llm, prompt });

/**
 * POST request handler for the FAQ endpoint
 * Processes incoming questions and returns AI-generated answers
 * @param {Request} req - The incoming request object containing the question
 * @returns {Promise<NextResponse>} JSON response with the answer or error message
 */
export async function POST(req: Request) {
  try {
    // Extract the question from the request body
    const { question } = await req.json();

    // Validate that a question was provided
    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // First try to find an exact match in our FAQ database
    const faqMatch = Object.entries(FAQ_DB).find(([faqQ]) =>
      question.toLowerCase().includes(faqQ.toLowerCase())
    );

    // Return FAQ answer if found, otherwise use LLM
    if (faqMatch) {
      return NextResponse.json({
        answer: `[From FAQ] ${faqMatch[1]}`,
        source: "faq",
      });
    }

    // If no FAQ match is found, use the LLM to generate an answer
    const response = await qaChain.call({ question });
    return NextResponse.json({
      answer: `[AI Generated] ${response.text.trim()}`,
      source: "ai",
    });
  } catch (error) {
    // Log and handle any errors that occur during processing
    console.error("Error processing question:", error);
    return NextResponse.json(
      { error: "Failed to process question" },
      { status: 500 }
    );
  }
}
