"use client";
import React from "react";

import Image from "next/image";
import MobileSidebar from "./MobileSidebar";
import { PanelLeft } from "lucide-react";
import { useSideBarToogle } from "./SidBarToggleProvider";

export default function NavBar() {
  const { toggle } = useSideBarToogle();
  return (
    <div className="w-full px-2 z-50 pb-2 py-2 flex fixed top-0 justify-between  items-center gap-2">
      <MobileSidebar />
      <PanelLeft onClick={toggle} className="size-[30px] text-white ml-2 mt-1 cursor-pointer hover:scale-[1.1] transition-all duration-300 max-md:hidden" />
      <div className="flex items-start gap-6  mr-5 ">
        <button title="share the link" className="border hover:bg-DarkGray transition-all duration-200 px-3 py-2  rounded-full border-Daker bg-transparent text-white">
          Share
        </button>
        <Image src={"/icons/userholder.png"} width={30} height={30} alt=" user icon" />
      </div>
    </div>
  );
}
