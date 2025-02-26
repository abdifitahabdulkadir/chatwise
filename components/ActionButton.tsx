import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "./ui/button";

interface ActionProps {
  onClick: () => void;
  isRecording?: boolean;
  classNames?: string;
  children: ReactNode;
  title: string;
}
export default function ActionButton({
  onClick,
  isRecording,
  classNames,
  children,
  title,
}: ActionProps) {
  return (
    <Button
      disabled={isRecording}
      title={title}
      type="button"
      onClick={onClick}
      className={cn(
        "flex size-[4rem] cursor-pointer items-center justify-center rounded-full bg-white/50 transition-all duration-200 hover:scale-[1.1]",
        classNames,
      )}
    >
      {children}
    </Button>
  );
}
