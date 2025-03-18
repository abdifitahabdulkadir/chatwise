import handleError from "@/lib/error-handler";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  const chatId = req.url.split("/").at(-1);

  try {
    if (!chatId) return NextResponse.json({ success: true, data: undefined });
    const chats = await prisma.chat.findMany({
      where: {
        chatId,
      },
      orderBy: {
        id: "asc",
      },
    });

    if (!chats || chats.length === 0)
      return NextResponse.json({ success: true, data: undefined });

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(chats)),
    });
  } catch (error) {
    return handleError("api", error) as ApiErroResponse;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { question, chatId, userId, answer }: StoreChatParams =
      await req.json();
    const buildChat = [
      {
        content: question,
        role: "user",
        chatId: chatId!,
      },
      {
        content: answer ?? "",
        role: "system",
        chatId: chatId!,
      },
    ];

    return await prisma.$transaction(async (currentTransactionClient) => {
      //find if chatid is already existed
      const currentTitle = await currentTransactionClient.chat.findFirst({
        where: {
          chatId: chatId,
        },
      });

      //if not, create new chat title with given chat Id
      if (!currentTitle) {
        await currentTransactionClient.titles.create({
          data: {
            title: question,
            chatId: chatId!,
            userId: userId!,
          },
        });

        // also add current chat under newly created chat title
        await currentTransactionClient.chat.createMany({
          data: buildChat,
        });
      } else {
        // if chat title existed, then only append
        //current message to its messages.
        await currentTransactionClient.chat.createMany({
          data: buildChat,
        });
      }
      return NextResponse.json({ success: true });
    });
  } catch (error) {
    return handleError("api", error) as ApiErroResponse;
  }
}
