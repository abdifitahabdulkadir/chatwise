"use client";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import ChatLists from "./ChatLists";
import LeftSideBar from "./LeftSideBar";
import NavBar from "./NavBar";
import SideBarToggleProvider from "./SidBarToggleProvider";
const client = new QueryClient();
export default function Main({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const current = localStorage.getItem("selectedSidebarItem");
    if (current) {
      router.replace(`/chat/${current}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <QueryClientProvider client={client}>
      <SideBarToggleProvider>
        <main className="bg-medium-gray min-h-screen w-full">
          <NavBar />
          <section
            className={cn(
              "grid w-full flex-1 grid-cols-[15rem_1fr] overflow-hidden max-md:grid-cols-1",
            )}
          >
            <LeftSideBar />
            <ChatLists>{children}</ChatLists>
          </section>
        </main>
      </SideBarToggleProvider>
    </QueryClientProvider>
  );
}
