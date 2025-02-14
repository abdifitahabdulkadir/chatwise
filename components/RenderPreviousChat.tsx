import SystemChatServer from "./SystemChatServer";
import UserChatItem from "./UserChatItem";

export function RenderPreviousChat({ content, role }: PreviousChatPros) {
  if (role == "user") return <UserChatItem content={content} />;

  return <SystemChatServer content={content} />;
}
