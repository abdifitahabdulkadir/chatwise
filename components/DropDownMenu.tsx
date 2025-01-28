import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
interface DropDownMenuProps {
  children: ReactNode;
  trigger: ReactNode;
  label: string;
}
export default function DropDownMenu({
  children,
  trigger,
  label,
}: DropDownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="!bg-dark-gray border-medium-gray w-[200px] border px-5 py-6">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
