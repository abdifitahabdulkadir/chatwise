"use server";

import ChatsModel from "@/database/chat.model";
import ChatTitleModel from "@/database/chatttile.model";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { actionHandler } from "../action-handler";
import handleError from "../error-handler";
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

  const session = await mongoose.startSession();
  session.startTransaction();

  const { question, answer, chatId } = params;
  const userId = validateResult.session?.user?.id;
  try {
    let currentTitle = await ChatTitleModel.findOne({ chatId }).session(
      session,
    );
    const message = [
      {
        content: question,
        role: "user",
        chatId,
      },
      {
        content: answer,
        role: "system",
        chatId,
      },
    ];
    if (!currentTitle) {
      [currentTitle, ,] = await Promise.all([
        ChatTitleModel.create(
          [
            {
              userId,
              title: question,
              chatId,
            },
          ],
          { session },
        ),
        ChatsModel.create([...message], { session }),
      ]);
    } else {
      const chatMessage = await ChatsModel.create([...message], { session });
      if (!chatMessage) throw new Error("Failed to store chat message");
    }

    await session.commitTransaction();

    return { success: true, data: JSON.parse(JSON.stringify(currentTitle)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError("server", error) as ErrorResponse;
  } finally {
    await session.endSession();
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
    const titles = await ChatTitleModel.find({ userId }).sort({
      _id: -1,
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

    const chats = await ChatsModel.find({ chatId }).sort({ _id: 1 });
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
    const updatedTittle = await ChatTitleModel.findOneAndUpdate(
      {
        userId,
        chatId: chatTitleId,
      },
      {
        title: newTitile,
      },
    );
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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await ChatTitleModel.deleteOne(
      {
        userId,
        chatId: chatTitleId,
      },
      { session },
    );

    // delete all titles
    await ChatsModel.deleteMany({
      chatId: chatTitleId,
    });
    await session.commitTransaction();
    revalidatePath(currentPath);
    return {
      success: true,
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError("server", error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
