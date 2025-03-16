"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { actionHandler } from "../action-handler";
import handleError from "../error-handler";

import prisma from "@/prisma";
import {
  DeleteChatTitleShcema,
  GetAllChatsSchema,
  RenameChatTitleSchema,
  StoreChatSchema,
} from "../validations";

export async function storeChat(
  params: StoreChatParams,
): Promise<ActionResponse<ChatTitleI>> {
  const validateResult = await actionHandler({
    schema: StoreChatSchema,
    params,
    authorize: true,
  });

  if (validateResult instanceof Error) {
    return handleError("server", validateResult) as ErrorResponse;
  }

  const { question, answer, chatId } = params;
  const userId = validateResult.session?.user?.id;
  if (!userId)
    return handleError(
      "server",
      new Error("Authenticated User can only do this operation"),
    ) as ErrorResponse;
  try {
    const buildChat = [
      {
        content: question,
        role: "user",
        chatId: chatId!,
      },
      {
        content: answer,
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
      return { success: true };
    });
  } catch (error) {
    return handleError("server", error) as ErrorResponse;
  }
}

export async function getChatSidebarTitles(): Promise<
  ActionResponse<ChatTitleI[]>
> {
  const validateResult = await actionHandler({
    authorize: true,
  });

  if (validateResult instanceof Error)
    return handleError("server", validateResult) as ErrorResponse;

  try {
    const userId = validateResult.session?.user?.id;
    const titles = await prisma.titles.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: "desc",
      },
    });

    return { success: true, data: JSON.parse(JSON.stringify(titles)) };
  } catch (error) {
    return handleError("server", error) as ErrorResponse;
  }
}

export async function getChats(
  params?: z.infer<typeof GetAllChatsSchema>,
): Promise<ActionResponse<ChatItemI[]>> {
  const validationResult = await actionHandler({
    schema: GetAllChatsSchema,
    params,
    authorize: true,
  });

  if (validationResult instanceof Error)
    return handleError("server", validationResult) as ErrorResponse;

  try {
    const { chatId } = params ?? {};

    if (!chatId) return { success: true, data: undefined };

    const chats = await prisma.chat.findMany({
      where: {
        chatId,
      },
      orderBy: {
        id: "asc",
      },
    });
    if (!chats || chats.length === 0) return { success: true, data: undefined };
    return { success: true, data: JSON.parse(JSON.stringify(chats)) };
  } catch (error) {
    return handleError("server", error) as ErrorResponse;
  }
}

export async function renameChatTitle(params: RenameChatTitleParams) {
  const validationResult = await actionHandler({
    params: params,
    schema: RenameChatTitleSchema,
    authorize: true,
  });

  if (validationResult instanceof Error)
    return handleError("server", validationResult) as ErrorResponse;

  const { chatTitleId, newTitile, currentPath } = params;
  const userId = validationResult?.session?.user?.id;

  try {
    if (userId) throw new Error("Authenticated users are allowed to rename ");
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
    revalidatePath(currentPath);
    return {
      success: true,
    };
  } catch (error) {
    return handleError("server", error) as ErrorResponse;
  }
}

// deleting the chat seessin
export async function deleteChatSession(params: DeleteChatTitleParams) {
  const validationResult = await actionHandler({
    params: params,
    schema: DeleteChatTitleShcema,
    authorize: true,
  });

  if (validationResult instanceof Error)
    return handleError("server", validationResult) as ErrorResponse;

  const { chatTitleId, currentPath } = params;
  const userId = validationResult?.session?.user?.id;

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

      revalidatePath(currentPath);
      return {
        success: true,
      };
    });
  } catch (error) {
    return handleError("server", error) as ErrorResponse;
  }
}
