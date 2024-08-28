import { bungeeFont } from "@/lib/font";
import Image from "next/image";

export default function NoChatState() {
  return (
    <div className="w-full h-full gap-y-4 flex-col px-10 py-10 flex items-center justify-center">
      <Image
        src={"/logo.svg"}
        width={100}
        height={100}
        alt="not chat illustration"
        className="w-full h-[40%]"
      />

      <GetGradientBgText textToShow={"Your personal AI assistant Is Here."} />
      <GetGradientBgText textToShow={" Explore the future of AI."} />
      <GetGradientBgText textToShow={"Ask questions & get answers."} />
    </div>
  );
}

function GetGradientBgText({ textToShow }: { textToShow: String }) {
  return (
    <div className="bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r  from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
      <p className={`text-xl  font-bold  text-center ${bungeeFont.className}`}>
        {textToShow}
      </p>
    </div>
  );
}
