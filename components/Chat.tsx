"use client";

import GenerateChat from "@/components/GenerateChat";
import { useChat } from "ai/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCircleStop } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import CustomTextWithIcon from "./CustomTextWithIcon";
import DisplayChats from "./DisplayChats";
import NoChatState from "./NoChatState";
export default function Chat() {
  const {
    messages,
    isLoading,
    reload,
    stop,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat({
    api: "/api/chat",
    keepLastMessageOnError: true,
    onError: (errro) => {
      toast.error("Couldnot fetch the request try again.");
      setIsFetching(false);
    },
    onResponse() {
      setIsFetching(false);
    },
  });
  const [isFetching, setIsFetching] = useState(false);
  return (
    <div className="grid grid-rows-[1fr,auto] gap-y-5 h-[94vh] pb-10 w-full">
      <div className="overflow-y-auto p-4">
        {messages.length ? (
          <DisplayChats messages={messages} isFetching={isFetching} />
        ) : (
          <NoChatState />
        )}
      </div>
      <div className="grid grid-cols-[auto,1fr] items-center gap-x-1 w-full ">
        <div className="flex w-[4rem] lg:w-[14rem] items-center  lg:gap-x-2 ">
          <CustomTextWithIcon onClickHandler={stop} textOfIcon="Reload">
            <TbReload className="lg:w-[1.4rem] w-[1rem] h-[1rem] lg:h-[1.4rem]" />
          </CustomTextWithIcon>
          <CustomTextWithIcon onClickHandler={reload} textOfIcon="Stop">
            <FaCircleStop className="lg:w-[1.4rem] w-[1rem] h-[1rem] lg:h-[1.4rem]" />
          </CustomTextWithIcon>
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
    </div>
  );
}
