"use server";

import Groq from "groq-sdk";
import { ModelType } from "./types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getGroqChatCompletion = async (
  chatHistory: { request: string; response: string }[],
  model: ModelType
) => {
  const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] =
    chatHistory
      .map((chat) => [
        { role: "user" as const, content: chat.request },
        { role: "assistant" as const, content: chat.response },
      ])
      .flat();

  return groq.chat.completions.create({
    messages,
    model,
    max_completion_tokens: 1024,
    stop: null,
    stream: true,
  });
};
