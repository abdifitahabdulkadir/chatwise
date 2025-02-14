import SystemChatClient from "./SystemChatClient";
import UserChatItem from "./UserChatItem";

type RenderActiveProps = {
  content: string;
  isLoading: boolean;
  role: "system" | "user";
};
export default function RenderActiveChat({
  content,
  isLoading,
  role,
}: RenderActiveProps) {
  if (role == "user") return <UserChatItem content={content} />;

  return <SystemChatClient isLoading={isLoading} content={content} />;
}
