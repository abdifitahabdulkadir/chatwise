import LeftSideBar from "@/components/LeftSideBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ThinkSphere - Your AI Conversation Hub",
  description: "ThinkSphere is an intelligent AI-powered platform for seamless conversations, brainstorming, and problem-solving. Explore ideas, ask questions, and get insights instantly.",
};

export default function Home() {
  return (
    <main className="w-full min-h-screen overscroll-none bg-MediumGray grid grid-cols-[20%_80%]">
      <div className="h-screen sticky top-0">
        <LeftSideBar />
      </div>

      <div className="overflow-y-auto flex-grow flex items-center justify-center"></div>
    </main>
  );
}
