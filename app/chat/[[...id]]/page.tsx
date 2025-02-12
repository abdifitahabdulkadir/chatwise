import Main from "@/components/Main";
import { getChats } from "@/lib/actions/chat.action";

export default async function ChatHome({ params }: PageRouteParams) {
  const { id } = await params;
  const result = await getChats({
    titleId: String(id),
  });

  return <Main chats={result.data} />;
}
