import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AlignJustify } from "lucide-react";

import NavLinks from "./NavLinks";

export default function MobileSidebar() {
  return (
    <div className="hidden max-md:block">
      <Sheet>
        <SheetTrigger>
          <AlignJustify className="size-[30px] text-white" />
        </SheetTrigger>
        <SheetContent
          className="custom-scrollbar !bg-dark-gray overflow-y-auto border-none"
          side={"left"}
        >
          <DialogTitle className="hidden">Sidebar of chats</DialogTitle>
          <NavLinks isMobile />
        </SheetContent>
      </Sheet>
    </div>
  );
}
