"use client";
import { chats } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import ChatInput from "./ChatInput";
import EmptyChats from "./EmptyChats";
import LeftSideBar from "./LeftSideBar";
import NavBar from "./NavBar";
import { useSideBarToogle } from "./SidBarToggleProvider";

export default function ComposeSections({ children }: { children: ReactNode }) {
  const { isSidebarOpen } = useSideBarToogle();
  return (
    <main className={cn("bg-medium-gray h-screen w-full overflow-hidden")}>
      <NavBar />
      <div
        className={cn(
          isSidebarOpen
            ? "grid grid-cols-[20%_80%] max-md:grid-cols-[1fr]"
            : "grid-cols-[1fr]",
        )}
      >
        {isSidebarOpen && <LeftSideBar />}
        <div className="grid h-full max-h-[95vh] w-full grid-rows-[1fr_auto] gap-y-5 overflow-clip pt-14 pb-[1rem]">
          {chats.length ? <EmptyChats /> : children}
          <ChatInput />
        </div>
      </div>
    </main>
  );
}
