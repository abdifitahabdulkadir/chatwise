import { auth } from "@/auth";
import RenderContent from "@/components/ChatItems";
import Main from "@/components/Main";
import { getChatSidebarTitles, getChats } from "@/lib/actions/chat.action";
import { redirect } from "next/navigation";

export default async function ChatHome({ params }: PageRouteParams) {
  const { id } = await params;
  const session = await auth();
  if (!session) redirect("/auth/signin");

  if (id) {
    const [titles, chats] = await Promise.allSettled([
      getChatSidebarTitles(),
      getChats({
        chatId: String(id?.length > 1 ? id[id?.length - 1] : id),
      }),
    ]);

    return (
      <Main
        sidebarLists={
          titles.status === "fulfilled" ? titles.value.data || [] : []
        }
      >
        {chats.status === "fulfilled" && chats.value.data !== undefined
          ? chats?.value?.data.map(({ content, role }, index) => {
              return (
                <RenderContent
                  key={index}
                  content={content}
                  role={role === "user" ? "user" : "system"}
                />
              );
            })
          : undefined}
      </Main>
    );
  }

  const titles = await getChatSidebarTitles();
  return <Main sidebarLists={titles.data ?? []}>{undefined}</Main>;
}
