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
    const { chatId, userId, answer, question }: StoreChatParams =
      await req.json();

    // find if chatid is already existed
    const currentTitle = await prisma.titles.findFirst({
      where: {
        id: chatId,
        userId: userId!,
      },
      select: {
        id: true,
        title: true,
      },
    });

    // //if not, cancel the transaction and throw an error
    if (!currentTitle) {
      throw new Error("Not found title with given Chat Id");
    }

    // if chat title existed, then only append
    // current message to its messages.
    const buildChat = [
      {
        chatId: chatId!,
        content: question!,
        role: "user",
      },
      {
        chatId: chatId!,
        content: answer!,
        role: "system",
      },
    ];

    await prisma.chat.createMany({
      data: buildChat,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleError("api", error) as ApiErroResponse;
  }
}
