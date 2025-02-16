"use client";

import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import { useSidebarProvider } from "./SidBarToggleProvider";

export default function LeftSideBar({
  sidebarLists,
}: {
  sidebarLists?: ChatTitleI[];
}) {
  const { isSidebarOpen } = useSidebarProvider();

  if (isSidebarOpen) return null;

  return (
    <section
      className={cn(
        "custom-scrollbar h-screen w-full overflow-y-auto max-md:hidden",
      )}
    >
      <NavLinks sidebarLists={sidebarLists} />
    </section>
  );
}
