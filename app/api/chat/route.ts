import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(request: Request) {
  const req = await request.json();
  const stream = streamText({
    messages: req.messages,
    model: google("gemini-2.0-flash-001"),
    temperature: 0.6,
  });

  return stream.toDataStreamResponse();
}
