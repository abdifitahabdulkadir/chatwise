import { chatsLists } from "@/constants/chats";
import React from "react";
import ChatItem from "./ChatItem";

export default function ChatLists() {
  return (
    <div className="overflow-y-auto  gap-4 flex custom-scrollbar items-center flex-col overflow-x-clip ">
      {chatsLists.map((item, index) => {
        return <ChatItem key={index} {...item} />;
      })}
    </div>
  );
}
