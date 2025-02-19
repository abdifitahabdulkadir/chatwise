import { ChevronDown } from "lucide-react";

interface ScrollProps {
  onClick: () => void;
}
export default function ScrollToDownButton({ onClick }: ScrollProps) {
  return (
    <div className="fixed right-[5%] bottom-[10rem] flex size-[2.3rem] cursor-pointer items-center justify-center rounded-full bg-white/50 p-1 transition-all duration-200 hover:scale-[1.1]">
      <ChevronDown
        onClick={onClick}
        className="text-darker scale-[1.3] font-bold"
      />
    </div>
  );
}
