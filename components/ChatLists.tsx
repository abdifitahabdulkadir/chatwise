import { chatsLists } from "@/constants/chats";
import React from "react";
import ChatItem from "./ChatItem";
import ChatInput from "./ChatInput";

export default function ChatLists() {
  return (
    <section className="grid grid-rows-[1fr,auto] overflow-clip gap-y-5 max-h-screen h-full  pb-[1rem] w-full pt-14 ">
      <div className="overflow-y-auto  gap-4 flex custom-scrollbar items-center flex-col overflow-x-clip ">
        {chatsLists.map((item, index) => {
          return <ChatItem key={index} {...item} />;
        })}
      </div>
      <ChatInput />
    </section>
  );
}
