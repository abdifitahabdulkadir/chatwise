import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AlignJustify } from "lucide-react";

import NavLinks from "./NavLinks";
interface Props {
  sidebarLists: ChatTitleI[] | undefined;
}

export default function MobileSidebar({ sidebarLists }: Props) {
  return (
    <div className="hidden max-md:block">
      <Sheet>
        <SheetTrigger>
          <AlignJustify className="size-[30px] text-white" />
        </SheetTrigger>
        <SheetContent
          className="custom-scrollbar !bg-dark-gray w-[80%] overflow-y-auto border-none md:w-[50%]"
          side={"left"}
        >
          <DialogTitle className="hidden">Sidebar of chats</DialogTitle>
          <NavLinks isMobile sidebarLists={sidebarLists} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
