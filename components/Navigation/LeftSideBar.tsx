"use client";

import NavLinks from "./NavLinks";
import { useSidebarProvider } from "./SidBarToggleProvider";
export default function LeftSideBar() {
  const { isSidebarOpen } = useSidebarProvider();

  if (isSidebarOpen) return null;

  return (
    <div className="custom-scrollbar h-full w-[20%] overflow-y-auto max-md:hidden lg:w-[18%]">
      <NavLinks />
    </div>
  );
}
