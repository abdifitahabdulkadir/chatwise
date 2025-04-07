import { useSidebarProvider } from "@/components/Navigation/SidBarToggleProvider";
import { extractParamId, isNewChat } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useStoreChats } from "./useStoreChats";

interface Props {
  data: StoreChatParams;
  newTitleItem: ChatTitleI;
}

export function useAIChat({ data, newTitleItem }: Props) {
  const { addToSidebar } = useSidebarProvider();
  const params: Record<string, string> = useParams();
  const currentParamId = extractParamId(params);
  const checkIsNewChat = isNewChat(params);
  const [newChatId] = useState(() => uuid());
  const { mutate } = useStoreChats({
    currentParamId: checkIsNewChat ? newChatId : (currentParamId ?? ""),
    userId: newTitleItem.userId,
  });
  return useChat({
    api: "/api/chat",
    async onResponse() {
      if (checkIsNewChat) {
        addToSidebar([{ ...newTitleItem, chatId: newChatId }]);
      }
    },
    onFinish(message) {
      mutate({
        ...{ ...data, chatId: checkIsNewChat ? newChatId : currentParamId },
        answer: message.content,
        role: message.role === "user" ? "user" : "system",
      });
    },
  });
}
