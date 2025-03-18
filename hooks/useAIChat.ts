import { useSidebarProvider } from "@/components/SidBarToggleProvider";
import { useChat } from "@ai-sdk/react";
import { useStoreChats } from "./useStoreChats";

interface Props {
  data: StoreChatParams;
  newTitleItem: ChatTitleI;
  currentParamId: string;
  isNewChat: boolean;
}
export function useAIChat({
  data,
  isNewChat,
  currentParamId,
  newTitleItem,
}: Props) {
  const { addToSidebar } = useSidebarProvider();
  const { mutate } = useStoreChats({
    currentParamId: currentParamId ?? "",
    userId: newTitleItem.userId,
  });
  return useChat({
    api: "/api/chat",
    async onResponse() {
      if (isNewChat) {
        addToSidebar([newTitleItem]);
      }
    },
    onFinish(message) {
      mutate({
        ...data,
        answer: message.content,
        role: message.role === "user" ? "user" : "system",
      });
    },
  });
}
