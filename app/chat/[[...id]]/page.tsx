import { auth } from "@/auth";
import Main from "@/components/Main";
import { redirect } from "next/navigation";

export default async function ChatHome() {
  const session = await auth();

  if (!session) redirect("/auth/signin");
  return <Main session={session} />;
}
