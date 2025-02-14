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
      <DropdownMenuContent className="border-medium-gray/10 !bg-dark-gray border px-2 py-3">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
