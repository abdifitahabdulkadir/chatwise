"use client";

import { useAIChat } from "@/hooks/useAIChat";
import { useChats } from "@/hooks/useChat";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { useSidebarProvider } from "../Navigation/SidBarToggleProvider";
import ScrollToDownButton from "../ScrollToDownButton";
import { SystemItemSkelton, UserItemSkelton } from "../shared/Skeltons";
import ChatInput from "./ChatInput";
import RenderContent from "./ChatItems";
import ConverstationWithAI from "./ConverstationWithAI";
import EmptyChats from "./EmptyChats";

interface Props {
  session: Session;
}
export default function ChatLists({ session }: Props) {
  const messageParentRef = useRef<HTMLDivElement | null>(null);
  const { toggle } = useSidebarProvider();
  const [startVoice, setStartVoice] = useState(false);

  const [showScrollToBottomIcon, setShowScrollToBottomIcon] = useState(false);
  const { data, isLoading } = useChats();
  const chats = data?.data ?? [];
  const [question, setQuestion] = useState("");

  const {
    handleInputChange,
    input,
    isLoading: isAIGenerating,
    handleSubmit,
    messages,
  } = useAIChat({
    userId: session?.user?.id,
    question: question,
  });
  useEffect(
    function () {
      setTimeout(function () {
        if (messageParentRef.current) {
          messageParentRef.current.scrollTop =
            messageParentRef.current.scrollHeight;
        }
      }, 500);
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

  if (startVoice)
    return <ConverstationWithAI closeSession={handlestartVoice} />;
  return (
    <>
      <div
        onScroll={hanldeOnScroll}
        ref={messageParentRef}
        className="custom-scrollbar flex-1 overflow-x-hidden pb-[4rem]"
      >
        <div className="w-full">
          <div className="mx-auto w-full max-w-5xl md:max-w-[80rem] md:px-20">
            {!isLoading && !messages.length && !chats.length && (
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
              {chats &&
                !isLoading &&
                chats.map((item, index) => {
                  const content = item?.content ?? "";
                  const role = item?.role ?? "system";
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

        {showScrollToBottomIcon && chats.length !== 0 && (
          <ScrollToDownButton onClick={scrolloToBottom} />
        )}
      </div>
      <div className="w-full px-5">
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
      </div>
    </>
  );
}
