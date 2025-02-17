import {
  textToTextSystemInstructions,
  voiceToVoiceInstructions,
} from "@/constants";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(request: Request) {
  const { messages, isVoiceToVoice } = await request.json();
  if (isVoiceToVoice) {
    const stream = streamText({
      messages: [...messages],
      model: google("gemini-1.5-pro"),
      temperature: 0.6,
      system: voiceToVoiceInstructions,
    });
    return stream.toDataStreamResponse();
  }

  const stream = streamText({
    messages: [...messages],
    model: google("gemini-1.5-pro"),
    temperature: 0.6,
    system: textToTextSystemInstructions,
  });
  return stream.toDataStreamResponse();
}
