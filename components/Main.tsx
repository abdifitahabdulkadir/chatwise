"use client";

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
      <main className="flex h-screen w-full flex-col">
        <NavBar />

        <section className="flex flex-1 overflow-hidden">
          <LeftSideBar />
          <div className="flex h-full w-[80%] flex-1 flex-col lg:max-w-[82%]">
            <ChatLists session={session} />
          </div>
        </section>
      </main>
    </SideBarProvider>
  );
}
