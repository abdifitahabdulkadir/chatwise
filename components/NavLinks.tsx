import { chats } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import React from "react";
import ButtonWithIconText from "./shared/ButtonWithIconText";
import SidebarItem from "./SidebarItem";
import Image from "next/image";
import { SheetClose } from "./ui/sheet";

interface NavLinksProps {
  isMobile?: boolean;
}
export default function NavLinks({ isMobile = false }: NavLinksProps) {
  return (
    <div
      className={cn("relative flex h-full w-full flex-col bg-DarkGray pt-16")}
    >
      <div className="custom-scrollbar h-0 max-h-[70vh] w-full flex-grow overflow-y-auto px-4 py-10">
        <button className="flex h-fit w-full items-center justify-start gap-4 rounded-[6px] border border-LightGray bg-transparent px-5 py-3 text-white outline-none">
          <Image
            src={"/icons/plus.svg"}
            alt="plus icon"
            width={10}
            height={10}
            className="object-contain"
          />
          <span className="text-xs lg:text-sm">New chat</span>
        </button>
        <div className="flex w-full flex-col gap-y-3 py-5">
          {chats.map((item, index) => {
            const contnet = (
              <SidebarItem key={index} iconUrl={item.icon} text={item.title} />
            );
            return isMobile ? (
              <SheetClose asChild key={index}>
                {contnet}
              </SheetClose>
            ) : (
              contnet
            );
          })}
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-2 border-t border-LightGray py-4">
        <ButtonWithIconText
          buttonType="clear"
          iconUrl="/icons/delete.svg"
          text="Clear conversations"
          alt="delete icon"
        />
        <ButtonWithIconText
          buttonType="lightMode"
          iconUrl="/icons/contrast.svg"
          text="Light mode"
          alt="light mode icon"
        />
        <ButtonWithIconText
          buttonType="logout"
          iconUrl="/icons/logout.svg"
          text="Logout"
          alt="logout icon"
        />
      </div>
    </div>
  );
}
