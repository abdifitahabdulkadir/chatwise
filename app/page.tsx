import ChatLists from "@/components/ChatLists";
import { Metadata } from "next";
import ComposeSections from "@/components/ComposeSections";
import SideBarToggleProvider from "@/components/SidBarToggleProvider";

export const metadata: Metadata = {
  title: "ThinkSphere - Your AI Conversation Hub",
  description: "ThinkSphere is an intelligent AI-powered platform for seamless conversations, brainstorming, and problem-solving. Explore ideas, ask questions, and get insights instantly.",
};

export default function Home() {
  return (
    <SideBarToggleProvider>
      <ComposeSections>
        <ChatLists />
      </ComposeSections>
    </SideBarToggleProvider>
  );
}
