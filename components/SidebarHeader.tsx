import { bungeeFont } from "@/lib/font";
import Image from "next/image";
import ThemeToggleButton from "./ThemeToggleButton";
export default function SidebarHeader() {
  return (
    <div
      className="flex flex-col relative border-b border-white/5   items-center justify-center  gap-y-3  
     shadow-sm   gap-x-3  pb-5"
    >
      <div className="flex items-center flex-col gap-x-3 w-full">
        <Image
          width={50}
          height={50}
          priority
          alt="logo of wise chat"
          src={"/logo.svg"}
          className="w-[3rem] h-[3rem] lg:w-[5rem] lg:h-[5rem] xl:w-[6rem] xl:h-[6rem]"
        />
        <h2 className={`text-secondary mt-4 text-2xl ${bungeeFont.className}`}>
          ChatWise
        </h2>
      </div>

      <ThemeToggleButton />
    </div>
  );
}
