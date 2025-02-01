import { chatsLists } from "@/constants/chats";
import ChatItem from "./ChatItem";

export default function ChatLists() {
  return (
    <div className="custom-scrollbar flex flex-col items-center gap-4 overflow-x-clip overflow-y-auto">
      {chatsLists.map((item, index) => {
        return <ChatItem key={index} {...item} />;
      })}
    </div>
  );
}
