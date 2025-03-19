"use client";

import { useAIChat } from "@/hooks/useAIChat";
import { useChats } from "@/hooks/useChat";
import { cn, extractParamId, isNewChat } from "@/lib/utils";
import { Session } from "next-auth";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import RenderContent from "./ChatItems";
import ConverstationWithAI from "./ConverstationWithAI";
import EmptyChats from "./EmptyChats";
import ScrollToDownButton from "./ScrollToDownButton";
import { useSidebarProvider } from "./SidBarToggleProvider";
import { SystemItemSkelton, UserItemSkelton } from "./Skeltons";
interface Props {
  session: Session;
}
export default function ChatLists({ session }: Props) {
  const messageParentRef = useRef<HTMLDivElement | null>(null);
  const { isSidebarOpen, toggle } = useSidebarProvider();
  const params: Record<string, string> = useParams();
  const [startVoice, setStartVoice] = useState(false);
  const currentParamId = extractParamId(params);
  const checkIsNewChat = isNewChat(params);
  const [showScrollToBottomIcon, setShowScrollToBottomIcon] = useState(false);
  const { data, isLoading } = useChats({
    currentParamId: currentParamId ?? "",
    enabled: !checkIsNewChat && !!currentParamId,
  });

  const [question, setQuestion] = useState("");

  const {
    handleInputChange,
    input,
    isLoading: isAIGenerating,
    handleSubmit,
    messages,
  } = useAIChat({
    data: {
      question: question,
      chatId: currentParamId!,
      userId: session?.user?.id,
    },
    isNewChat: checkIsNewChat,
    currentParamId: currentParamId ?? "",
    newTitleItem: {
      userId: session.user?.id,
      chatId: currentParamId ?? "",
      title: question,
    },
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
    if (!session) return;
    handleSubmit(event);
  }

  function handlestartVoice() {
    if (!session) return;
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

  useEffect(function () {
    scrolloToBottom();
  }, []);

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
              {!startVoice &&
                !isLoading &&
                !messages.length &&
                !data?.data?.length && (
                  <EmptyChats className="h-screen max-h-[50vh]" />
                )}

              <div className="mx-auto mb-6 flex w-full flex-col items-center gap-4">
                {isLoading &&
                  Array.from({ length: 10 }, (_, index) => {
                    return index % 2 === 0 ? (
                      <UserItemSkelton key={index} />
                    ) : (
                      <SystemItemSkelton key={index} />
                    );
                  })}
                {data &&
                  !isLoading &&
                  data?.data?.map(({ content, role }, index) => {
                    return (
                      <RenderContent
                        key={index}
                        content={content}
                        role={role === "user" ? "user" : "system"}
                      />
                    );
                  })}
                {messages.length > 0 &&
                  messages?.map(({ content, role }, index) => {
                    return (
                      <RenderContent
                        key={index}
                        content={content}
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
            hanldeOnChange={(e) => {
              handleInputChange(e);
              setQuestion(e.currentTarget.value);
            }}
            inputValue={input}
          />

          {showScrollToBottomIcon && data?.data?.length !== undefined && (
            <ScrollToDownButton onClick={scrolloToBottom} />
          )}
        </>
      )}
    </div>
  );
}
