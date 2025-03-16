"use client";

import { toast } from "@/hooks/use-toast";
import { PanelLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import MobileSidebar from "./MobileSidebar";
import { useSidebarProvider } from "./SidBarToggleProvider";

interface Props {
  sidebarLists?: ChatTitleI[];
}
export default function NavBar({ sidebarLists }: Props) {
  const { toggle } = useSidebarProvider();
  const pathName = usePathname();
  return (
    <div className="fixed top-0 z-50 flex h-[6vh] w-full items-center justify-between gap-2 bg-transparent px-2 py-6 pb-2">
      <MobileSidebar sidebarLists={sidebarLists} />
      <PanelLeft
        onClick={toggle}
        className="mt-1 ml-2 size-[30px] cursor-pointer text-white transition-all duration-300 hover:scale-[1.1] max-md:hidden"
      />
      <div className="mr-5 flex items-center gap-6">
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.host}/${pathName}`,
            );
            toast({
              title: "Successfully copied the LInk",
            });
          }}
          title="share the link"
          className="border-darker hover:bg-dark-gray cursor-pointer rounded-full border bg-transparent px-3 py-2 text-white transition-all duration-200"
        >
          Share
        </button>
      </div>
    </div>
  );
}
