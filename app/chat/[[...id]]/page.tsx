import RenderContent from "@/components/ChatItems";
import Main from "@/components/Main";
import { getChats } from "@/lib/actions/chat.action";

export default async function ChatHome({ params }: PageRouteParams) {
  const { id } = await params;
  const { data } = await getChats({
    chatId: String(id),
  });

  return (
    <Main>
      {data !== undefined
        ? data.map(({ content, role }, index) => {
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
