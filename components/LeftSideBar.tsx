"use client";

import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import { useSideBarToogle } from "./SidBarToggleProvider";

export default function LeftSideBar() {
  const { isSidebarOpen } = useSideBarToogle();
  if (isSidebarOpen) return null;

  return (
    <section
      className={cn(
        "custom-scrollbar h-screen w-full overflow-y-auto max-md:hidden",
      )}
    >
      <NavLinks />
    </section>
  );
}
