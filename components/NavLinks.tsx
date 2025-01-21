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
    <div className={cn("flex flex-col pt-16 h-full relative w-full bg-DarkGray")}>
      <div className="w-full overflow-y-auto max-h-[70vh]  custom-scrollbar h-0 flex-grow px-4 py-10">
        <button className="bg-transparent items-center text-white outline-none  flex gap-4 justify-start border border-LightGray w-full h-fit rounded-[6px] px-5 py-3">
          <Image src={"/icons/plus.svg"} alt="plus icon" width={10} height={10} className="object-contain" />
          <span className="text-xs lg:text-sm">New chat</span>
        </button>
        <div className="w-full flex flex-col gap-y-3 py-5">
          {chats.map((item, index) => {
            const contnet = <SidebarItem key={index} iconUrl={item.icon} text={item.title} />;
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
      <div className="w-full border-t border-LightGray py-4 flex flex-col gap-y-2">
        <ButtonWithIconText iconUrl="/icons/delete.svg" text="Clear conversations" alt="delete icon" />
        <ButtonWithIconText iconUrl="/icons/contrast.svg" text="Light mode" alt="light mode icon" />
        <ButtonWithIconText iconUrl="/icons/logout.svg" text="Logout" alt="logout icon" />
      </div>
    </div>
  );
}
