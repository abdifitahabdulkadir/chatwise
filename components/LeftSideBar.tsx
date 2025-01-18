import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { chats } from "@/constants/sidebar";
import SidebarItem from "./SidebarItem";
import ButtonWithIconText from "./shared/ButtonWithIconText";

export default function LeftSideBar() {
  return (
    <section className="flex flex-col h-full w-full bg-DarkGray">
      {/* Scrollable Chat List Section */}
      <div className="w-full overflow-y-auto left-sidebar h-0 flex-grow px-4 py-10">
        <Button className="bg-transparent flex gap-4 justify-start border border-LightGray w-full h-fit rounded-[6px] px-5 py-3">
          <Image src={"/icons/plus.svg"} alt="plus icon" width={10} height={10} className="object-contain" />
          <span>New chat</span>
        </Button>
        <div className="w-full flex flex-col gap-y-3 py-5">
          {chats.map((item, index) => (
            <SidebarItem key={index} iconUrl={item.icon} text={item.title} />
          ))}
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="w-full border-t border-LightGray py-4">
        <ButtonWithIconText iconUrl="/icons/delete.svg" text="Clear conversations" alt="delete icon" />
        <ButtonWithIconText iconUrl="/icons/contrast.svg" text="Light mode" alt="light mode icon" />
        <ButtonWithIconText iconUrl="/icons/discord.svg" text="OpenAI Discord" alt="discord icon" />
        <ButtonWithIconText iconUrl="/icons/enlarge.svg" text="Updates & FAQ" alt="update icon" />
        <ButtonWithIconText iconUrl="/icons/logout.svg" text="Logout" alt="logout icon" />
      </div>
    </section>
  );
}
