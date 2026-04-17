import { NextRequest } from "next/server";
import OpenAI from "openai";
import { NOVACART_KNOWLEDGE } from "@/data/novacart-knowledge";

const SYSTEM_PROMPT = `You are the official NovaCart AI assistant. Your role is to help users learn about NovaCart — the company, its products, services, policies, and team.

STRICT RULE: Only answer questions related to NovaCart. If a user asks about anything unrelated to NovaCart, politely respond: "I can only help with questions about NovaCart. Is there something about NovaCart I can assist you with?"

Keep answers concise, friendly, and helpful. Use the knowledge base below to answer accurately.

--- NovaCart Knowledge Base ---
${NOVACART_KNOWLEDGE}
--- End of Knowledge Base ---`;

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response("OPENAI_API_KEY is not set", { status: 500 });
  }

  const { message, history } = await req.json();

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...(history ?? []),
    { role: "user", content: message },
  ];

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    max_tokens: 1024,
    stream: true,
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? "";
        if (text) controller.enqueue(new TextEncoder().encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
