import SystemChatItem from "./SystemChatItem";
import UserChatItem from "./UserChatItem";

export default function RenderActiveChat({
  content,
  isLoading,
  role,
}: RenderActiveProps) {
  if (role == "user") return <UserChatItem content={content} />;

  return <SystemChatItem isLoading={isLoading} content={content} />;
}
