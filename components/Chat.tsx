"use client";
import GenerateChat from "@/components/GenerateChat";
import { useChat } from "ai/react";
import { unstable_noStore as noStore } from "next/cache";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import DisplayChats from "./DisplayChats";
import NoChatState from "./NoChatState";
export const dynamic = "force-dynamic";
export const maxDuration = 0;
// components
export default function Chat() {
  noStore();
  const [isFetching, setIsFetching] = useState(false);
  const chatScrollingRef = useRef<HTMLDivElement | null>(null);
  const { messages, isLoading, input, handleInputChange, handleSubmit } =
    useChat({
      api: "/api/chat",
      keepLastMessageOnError: true,

      onError: (errro) => {
        toast.error("Couldnot fetch the request try again.");
        setIsFetching(false);
      },
      onResponse() {
        setIsFetching(false);
      },
      onFinish(message, options) {
        const user = {
          id: message.id,
          content: input,
          createdAt: message.createdAt,
          role: "user",
        };

        //system object -- simply spread out as we dont override any
        // property.
        const system = {
          ...message,
        };

        // save to database.
      },
    });

  // automatic scolling as we receive
  useEffect(
    function () {
      const scrollElement = chatScrollingRef.current;
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    },
    [messages]
  );
  return (
    <div className="grid grid-rows-[1fr,auto] overflow-y-auto gap-y-5 max-h-[94vh] h-full  pb-[3rem] w-full">
      <div
        ref={chatScrollingRef}
        className="overflow-y-auto overflow-x-clip p-4"
      >
        {messages.length ? (
          <DisplayChats messages={messages} />
        ) : (
          <NoChatState />
        )}
      </div>

      <GenerateChat
        disable={isLoading}
        input={input}
        handleSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsFetching(true);
          handleSubmit(e, {
            data: {
              // context --means giving the previous chats so that it can be
              // more specific
              prompt: messages + input,
            },
          });
        }}
        hanldeOnChnage={handleInputChange}
      />
    </div>
  );
}
