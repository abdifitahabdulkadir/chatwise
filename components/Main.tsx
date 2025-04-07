"use client";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "regenerator-runtime/runtime";
import ChatLists from "./Chats/ChatLists";
import LeftSideBar from "./Navigation/LeftSideBar";
import NavBar from "./Navigation/NavBar";
import SideBarProvider from "./Navigation/SidBarToggleProvider";

interface Pros {
  session: Session;
}
export default function Main({ session }: Pros) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (typeof window !== undefined) {
        const current = localStorage.getItem("selectedSidebarItem");
        if (current) {
          router.replace(`/chat/${current}`, { scroll: false });
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SideBarProvider>
      <main className="bg-medium-gray flex min-h-screen w-full items-center justify-center">
        <NavBar />
        <section
          className={cn(
            "grid w-full flex-1 grid-cols-[15rem_1fr] overflow-hidden max-md:grid-cols-1",
          )}
        >
          <LeftSideBar />
          <ChatLists session={session} />
        </section>
      </main>
    </SideBarProvider>
  );
}
