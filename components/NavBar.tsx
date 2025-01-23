"use client";
import React from "react";

import Image from "next/image";
import MobileSidebar from "./MobileSidebar";
import { PanelLeft } from "lucide-react";
import { useSideBarToogle } from "./SidBarToggleProvider";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { toggle } = useSideBarToogle();
  const session = useSession();
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between gap-2 px-2 py-2 pb-2">
      <MobileSidebar />
      <PanelLeft
        onClick={toggle}
        className="ml-2 mt-1 size-[30px] cursor-pointer text-white transition-all duration-300 hover:scale-[1.1] max-md:hidden"
      />
      <div className="mr-5 flex items-start gap-6">
        <button
          title="share the link"
          className="rounded-full border border-Daker bg-transparent px-3 py-2 text-white transition-all duration-200 hover:bg-DarkGray"
        >
          Share
        </button>
        {session.data && (
          <Image
            src={session.data.user?.image || "/icons/userholder.png"}
            width={30}
            height={30}
            alt=" user icon"
            className="rounded-full object-cover object-center"
          />
        )}
      </div>
    </div>
  );
}
