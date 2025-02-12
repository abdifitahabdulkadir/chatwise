"use client";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import ChatLists from "./ChatLists";
import LeftSideBar from "./LeftSideBar";
import NavBar from "./NavBar";
import SideBarToggleProvider from "./SidBarToggleProvider";
const client = new QueryClient();
export default function Main({ children }: { children: ReactNode }) {
  // const queryClient = useQueryClient();
  // const params = useParams();
  // const { data: chats } = useQuery({
  //   queryKey: ["chats", params.id],
  //   queryFn: async () => {
  //     if (params.id == null) return [];
  //     const result = await getChats({
  //       titleId: params.id as string,
  //     });
  //     if (result.success)
  //       queryClient.invalidateQueries({ queryKey: ["chats", params.id] });

  //     return result.data;
  //   },
  // });

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
