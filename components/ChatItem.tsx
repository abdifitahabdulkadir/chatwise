import SystemChatItem from "./SystemChatItem";
import UserChatItem from "./UserChatItem";

export function RenderPreviousChat({ content, role }: PreviousChatPros) {
  if (role == "user") return <UserChatItem content={content} />;

  return <SystemChatItem isFromSever={true} content={content} />;
}
