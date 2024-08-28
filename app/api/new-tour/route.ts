import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });
function createPrompt(city: string, country: string): string {
  const query = `Given the city ${city} in ${country}, please generate a list of must-visit places and tourist attractions. Include popular landmarks, cultural sites, and unique local experiences that travelers should explore. Make sure the list is tailored specifically to ${city} and reflects the best that ${city} has to offer in ${country}.
  and then generate the response simple short lists and title and 
  descriptions.

`;

  return query;
}

export async function POST(req: Request, res: Response) {
  try {
    const requestBody = await req.json();
    const prompt = requestBody.data.prompt;
    const geminiStream = await genAI
      .getGenerativeModel({ model: "gemini-pro" })
      .generateContentStream(createPrompt(prompt.cty, prompt.country));

    // Convert the response into a friendly text-stream
    const stream = GoogleGenerativeAIStream(geminiStream);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
