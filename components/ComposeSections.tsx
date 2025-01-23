"use client";
import LeftSideBar from "./LeftSideBar";
import { cn } from "@/lib/utils";
import NavBar from "./NavBar";
import { ReactNode } from "react";
import { useSideBarToogle } from "./SidBarToggleProvider";
import { chats } from "@/constants/sidebar";
import EmptyChats from "./EmptyChats";
import ChatInput from "./ChatInput";

export default function ComposeSections({ children }: { children: ReactNode }) {
  const { isSidebarOpen } = useSideBarToogle();
  return (
    <main className={cn("h-screen w-full overflow-hidden bg-MediumGray")}>
      <NavBar />
      <div
        className={cn(
          isSidebarOpen
            ? "grid grid-cols-[20%_80%] max-md:grid-cols-[1fr]"
            : "grid-cols-[1fr]",
        )}
      >
        {isSidebarOpen && <LeftSideBar />}
        <div className="grid h-full max-h-screen w-full grid-rows-[1fr_auto] gap-y-5 overflow-clip pb-[1rem] pt-14">
          {!chats.length ? <EmptyChats /> : children}
          <ChatInput />
        </div>
      </div>
    </main>
  );
}
