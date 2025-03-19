import handleError from "@/lib/error-handler";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

//get all sidebars of current user.
export async function POST(req: NextRequest) {
  try {
    const userId = await req.json();
    const titles = await prisma.titles.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(titles)),
    });
  } catch (error) {
    return handleError("api", error) as ApiErroResponse;
  }
}

// renaming chat title Text of current user
export async function PUT(req: Request) {
  try {
    const params = await req.json();
    const { chatTitleId, newTitile, userId } = params;

    const updatedTittle = await prisma.titles.update({
      where: {
        userId: userId!,
        chatId: chatTitleId,
      },
      data: {
        title: newTitile,
      },
    });
    if (!updatedTittle)
      throw new Error("Failed to update the title try again.");
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError("api", error) as ApiErroResponse;
  }
}

export async function DELETE(req: Request) {
  const { chatTitleId, userId } = await req.json();

  try {
    return await prisma.$transaction(async (currentTxClient) => {
      // delete all chats first,
      await currentTxClient.chat.deleteMany({
        where: {
          chatId: chatTitleId,
        },
      });

      // delete the title
      await currentTxClient.titles.delete({
        where: {
          userId,
          chatId: chatTitleId,
        },
      });

      return NextResponse.json(
        {
          success: true,
        },
        { status: 200 },
      );
    });
  } catch (error) {
    return handleError("api", error) as ApiErroResponse;
  }
}
