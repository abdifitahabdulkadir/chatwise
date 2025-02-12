"use client";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { useSideBarToogle } from "./SidBarToggleProvider";
export default function ChatLists({ children }: { children: ReactNode }) {
  const messageParentRef = useRef<HTMLDivElement | null>(null);
  const [, setIsLoading] = useState(0);
  const { isSidebarOpen } = useSideBarToogle();
  const {
    messages,
    handleInputChange,
    isLoading: isAIGenerating,
    handleSubmit,
    input,
  } = useChat({
    api: "/api/chat",
    onResponse: () => {
      setIsLoading(2);
    },
    onFinish() {
      //   try {
      //     storeChat({
      //       question: input,
      //       titleId: params.id as string,
      //       answer: message.content,
      //       role: message.role == "user" ? "user" : "system",
      //     });
      //     toast({
      //       title: "Sucesss",
      //       description: "Chat stored successfully",
      //     });
      //     return;
      //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //   } catch (err) {
      //     toast({
      //       title: "Failure",
      //       description: `Failed to store chat`,
      //       variant: "destructive",
      //     });
      //   }
      //
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
    setIsLoading(1);
    handleSubmit(event);
  }
  return (
    <div
      className={cn(
        "mt-20 grid h-full max-h-[88vh] w-full grid-rows-[1fr_auto] pb-[1rem]",
        isSidebarOpen ? "col-span-full" : "cols-span-1",
      )}
    >
      <div
        ref={messageParentRef}
        className="max-h-[70vh] w-full overflow-x-clip overflow-y-auto"
      >
        <div className="w-fullmax-w-5xl mx-auto h-full md:max-w-[80rem] md:px-20">
          {/* {!chats?.length && <EmptyChats />} */}

          <div className="mx-auto flex w-full flex-col items-center gap-4">
            {/* {chats !== undefined &&
              chats?.map(({ role, content }, index) => {
                return (
                  <RenderPreviousChat
                    key={index}
                    content={content}
                    role={role}
                  />
                );
              })} */}
            {children}

            {/* {messages?.map(({ role, content }, index) => {
              return (
                <RenderActiveChat
                  isLoading={isLoading === 1}
                  key={index}
                  content={content}
                  role={role}
                />
              );
            })} */}
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
