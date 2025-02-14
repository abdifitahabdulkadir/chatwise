import Main from "@/components/Main";
import { RenderPreviousChat } from "@/components/RenderPreviousChat";
import { getChats } from "@/lib/actions/chat.action";

export default async function ChatHome({ params }: PageRouteParams) {
  const { id } = await params;
  const result = await getChats({
    titleId: String(id),
  });

  return (
    <Main>
      {result.data &&
        result?.data.map(({ content, role }, index) => {
          return (
            <RenderPreviousChat key={index} content={content} role={role} />
          );
        })}
    </Main>
  );
}
