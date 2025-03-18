"use server";

import { revalidatePath } from "next/cache";
import { actionHandler } from "../action-handler";
import handleError from "../error-handler";

import prisma from "@/prisma";
import { DeleteChatTitleShcema, RenameChatTitleSchema } from "../validations";

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
