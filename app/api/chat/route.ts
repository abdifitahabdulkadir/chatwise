import { textToTextSystemInstructions } from "@/constants";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { smoothStream, streamText } from "ai";
export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(request: Request) {
  const { messages } = await request.json();
  const stream = streamText({
    messages: [...messages],
    model: google("gemini-1.5-pro"),
    temperature: 0.6,
    system: textToTextSystemInstructions,
    experimental_transform: smoothStream(),
  });
  return stream.toDataStreamResponse();
}
