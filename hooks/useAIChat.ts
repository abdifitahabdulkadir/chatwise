import { extractParamId, isNewChat } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useStoreChats } from "./useStoreChats";
import { useUpateSidebar } from "./useUpateSidebar";

export function useAIChat({ userId, question }: StoreChatParams) {
  const { mutate: updateSidebar } = useUpateSidebar();
  const params: Record<string, string> = useParams();
  const currentParamId = extractParamId(params);
  const checkIsNewChat = isNewChat(params);
  const [newChatId] = useState(() => uuid());

  const { mutate: storeChats } = useStoreChats({
    currentParamId: checkIsNewChat ? newChatId : (currentParamId ?? ""),
    userId: userId!,
  });

  return useChat({
    api: "/api/chat",
    async onResponse() {
      if (checkIsNewChat) {
        updateSidebar({
          data: { title: question, userId: userId, id: newChatId },
        });
      }
    },
    onFinish(message) {
      storeChats({
        chatId: checkIsNewChat ? newChatId : currentParamId,
        role: message.role === "user" ? "user" : "system",
        answer: message.content,
        question: question,
        userId: userId,
      });
    },
  });
}
