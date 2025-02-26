"use client";

import { toast } from "@/hooks/use-toast";
import { storeChat } from "@/lib/actions/chat.action";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import RenderContent from "./ChatItems";
import ConverstationWithAI from "./ConverstationWithAI";
import EmptyChats from "./EmptyChats";
import ScrollToDownButton from "./ScrollToDownButton";
import { useSidebarProvider } from "./SidBarToggleProvider";

interface ChatListPros {
  children: ReactNode | undefined;
}

export default function ChatLists({ children }: ChatListPros) {
  const messageParentRef = useRef<HTMLDivElement | null>(null);
  const { isSidebarOpen, toggle, addToSidebar } = useSidebarProvider();
  const params = useParams();
  const [isFinish, setIsFinish] = useState(false);
  const [startVoice, setStartVoice] = useState(false);
  const session = useSession();
  const [showScrollToBottomIcon, setShowScrollToBottomIcon] = useState(false);

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

  function handlestartVoice() {
    setStartVoice((prev) => !prev);
    toggle();
  }

  function hanldeOnScroll(e: React.UIEvent<HTMLDivElement> | undefined) {
    const scrolHeight = Number(e?.currentTarget.scrollHeight);
    const scrollTop = Number(e?.currentTarget.scrollTop);
    if (scrolHeight - scrollTop > 1000) {
      setShowScrollToBottomIcon(true);
      return;
    }
    setShowScrollToBottomIcon(false);
  }

  useEffect(() => {
    scrolloToBottom();
    if (!isFinish) return;
    if (startVoice) return;

    (async function saveData() {
      const result = await storeChat({
        question: message.question,
        chatId: message.titleId,
        answer: message.content,
        role: message.role == "user" ? "user" : "system",
      });

      if (!result.success) {
        toast({
          title: "Failed to Store Chat",
          description: "Failed to store chat, try again",
          variant: "destructive",
        });
        return;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinish]);

  function scrolloToBottom() {
    const current = messageParentRef.current;
    if (current) {
      current.style.height = "auto";
      current.scrollTop = current.scrollHeight;
    }
  }

  return (
    <div
      className={cn(
        "relative mt-20 grid h-[90vh] w-full grid-rows-[1fr_auto]",
        isSidebarOpen ? "col-span-full" : "cols-span-1",
      )}
    >
      {startVoice && <ConverstationWithAI closeSession={handlestartVoice} />}
      {!startVoice && (
        <>
          <div
            onScroll={hanldeOnScroll}
            ref={messageParentRef}
            className="main-scrollbar w-full overflow-x-clip overflow-y-auto pb-[7rem]"
          >
            <div className="mx-auto w-full max-w-5xl md:max-w-[80rem] md:px-20">
              {!startVoice && !messages.length && !children && (
                <EmptyChats className="h-screen max-h-[50vh]" />
              )}

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
            isVoicetoVoice={startVoice}
            handleRecordVoice={handlestartVoice}
            isLoading={isAIGenerating}
            handleFormSubmit={formSubmitHandler}
            hanldeOnChange={handleInputChange}
            inputValue={input}
          />

          {showScrollToBottomIcon && (
            <ScrollToDownButton onClick={scrolloToBottom} />
          )}
        </>
      )}
    </div>
  );
}
