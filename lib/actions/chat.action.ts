"use server";

import ChatsModel from "@/database/chat.model";
import ChatTitleModel from "@/database/chatttile.model";
import mongoose from "mongoose";
import { z } from "zod";
import { actionHandler } from "../action-handler";
import handleError from "../error-handler";
import { GetAllChatsSchema, StoreChatSchema } from "../validations";
export async function storeChat(
  params: StoreChatParams,
): Promise<ActionResponse> {
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

  const { question, answer, titleId } = params;
  const userId = validateResult.session?.user?.id;

  try {
    let currentTitle;
    if (titleId)
      currentTitle = await ChatTitleModel.findById(titleId).session(session);
    else
      [currentTitle] = await ChatTitleModel.create(
        [
          {
            userId,
            title: question,
          },
        ],
        { session },
      );

    if (!currentTitle) throw new Error("Failed to store title");

    const message = [
      {
        content: question,
        role: "user",
        titleId: currentTitle._id,
      },
      {
        content: answer,
        role: "system",
        titleId: currentTitle._id,
      },
    ];

    const chatMessage = await ChatsModel.create([...message], { session });

    if (!chatMessage) throw new Error("Failed to store chat message");

    await session.commitTransaction();

    return { success: true };
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
    const titles = await ChatTitleModel.find({ userId });

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
    const { titleId } = params ?? {};

    if (!titleId) return { success: true, data: undefined };
    const chats = await ChatsModel.find({ titleId }).sort({ _id: 1 });

    if (!chats) throw new Error("Failed to get chats");
    return { success: true, data: JSON.parse(JSON.stringify(chats)) };
  } catch (error) {
    return handleError("server", error) as ErrorResponse;
  }
}
