"use client";
import React from "react";
import { PanelLeft } from "lucide-react";
import { useSideBarToogle } from "./SidBarToggleProvider";
import Image from "next/image";
import { Button } from "./ui/button";

export default function NavBar() {
  const { toggle } = useSideBarToogle();
  return (
    <div className="w-full px-2 z-50 pb-2 py-2 flex fixed top-0 justify-between  items-center gap-2">
      <PanelLeft onClick={toggle} className="size-[30px] text-white ml-2 mt-1 cursor-pointer hover:scale-[1.1] transition-all duration-300" />
      <div className="flex items-start gap-6  mr-5 ">
        <Button title="share the link" className="border rounded-full border-Daker bg-transparent text-white">
          Share
        </Button>
        <Image src={"/icons/userholder.png"} width={30} height={30} alt=" user icon" />
      </div>
    </div>
  );
}
