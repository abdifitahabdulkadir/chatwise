"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import "regenerator-runtime/runtime";
import ChatLists from "./ChatLists";
import LeftSideBar from "./LeftSideBar";
import NavBar from "./NavBar";
import SideBarProvider from "./SidBarToggleProvider";

interface MainProps {
  children: ReactNode | undefined;
  sidebarLists: ChatTitleI[];
}
export default function Main({ children, sidebarLists }: MainProps) {
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
        <NavBar sidebarLists={sidebarLists} />
        <section
          className={cn(
            "grid w-full flex-1 grid-cols-[15rem_1fr] overflow-hidden max-md:grid-cols-1",
          )}
        >
          <LeftSideBar sidebarLists={sidebarLists} />
          <ChatLists>{children}</ChatLists>
        </section>
      </main>
    </SideBarProvider>
  );
}
