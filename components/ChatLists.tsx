"use client";
import { toast } from "@/hooks/use-toast";
import { storeChat } from "@/lib/actions/chat.action";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import RenderContent from "./ChatItems";
import EmptyChats from "./EmptyChats";
import { useSidebarProvider } from "./SidBarToggleProvider";

interface ChatListPros {
  children: ReactNode | undefined;
}

export default function ChatLists({ children }: ChatListPros) {
  const messageParentRef = useRef<HTMLDivElement | null>(null);
  const { isSidebarOpen, addToSidebar } = useSidebarProvider();
  const params = useParams();
  const [isFinish, setIsFinish] = useState(false);
  const session = useSession();

  const {
    messages,
    handleInputChange,
    isLoading: isAIGenerating,
    handleSubmit,
    input,
  } = useChat({
    api: "/api/chat",
    onResponse() {
      addToSidebar([
        {
          title: input,
          chatId: String(params.id),
          userId: session.data?.user?.id,
        },
      ]);
    },
    onFinish(message) {
      setIsFinish(true);
      setMessage({
        content: message.content,
        role: message.role,
        titleId: String(params.id ?? ""),
        question: input,
      });
    },
  });
  const [message, setMessage] = useState({
    content: "",
    role: "",
    titleId: "",
    question: "",
  });
  useEffect(
    function () {
      if (messageParentRef.current) {
        messageParentRef.current.scrollTop =
          messageParentRef.current.scrollHeight;
      }
    },
    [messages],
  );
  function formSubmitHandler(
    event?: { preventDefault?: (() => void) | undefined } | undefined,
  ) {
    setIsFinish(false);
    handleSubmit(event);
  }

  useEffect(() => {
    if (!isFinish) return;
    (async function saveData() {
      const result = await storeChat({
        question: message.question,
        chatId: message.titleId,
        answer: message.content,
        role: message.role == "user" ? "user" : "system",
      });

      if (result.success) {
        toast({
          title: "Chat saved successfully",
          description: "Chat has been saved successfully",
        });
        return;
      }
      toast({
        title: "Failed to Store Chat",
        description: "Failed to store chat, try again",
        variant: "destructive",
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinish]);

  return (
    <div
      className={cn(
        "mt-20 grid h-full max-h-[88vh] w-full grid-rows-[1fr_auto] pb-[1.3rem]",
        isSidebarOpen ? "col-span-full" : "cols-span-1",
      )}
    >
      <div
        ref={messageParentRef}
        className="max-h-full w-full overflow-x-clip overflow-y-auto"
      >
        <div className="mx-auto h-full w-full max-w-5xl md:max-w-[80rem] md:px-20">
          {!children && !messages.length && <EmptyChats />}

          <div className="mx-auto mb-6 flex w-full flex-col items-center gap-4">
            {children}

            {messages.length > 0 &&
              messages?.map(({ content, role }, index) => {
                return (
                  <RenderContent
                    key={index}
                    content={content}
                    isLoading={!isFinish}
                    role={role === "user" ? "user" : "system"}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <ChatInput
        isLoading={isAIGenerating}
        handleFormSubmit={formSubmitHandler}
        hanldeOnChange={handleInputChange}
        inputValue={input}
      />
    </div>
  );
}
