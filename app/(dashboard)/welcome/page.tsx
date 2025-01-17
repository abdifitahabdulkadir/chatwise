import { OAuthButtons } from "@/components/oauth-buttons";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-MediumGray">
      <div className=" w-fit h-fit py-3 flex flex-col gap-4 items-center ">
        <Image src={"/icons/logo.svg"} alt="logo icon" width={60} height={60} quality={100} loading="eager" priority className="object-contain  " />
        <p className="font-medium  text-[15px] text-white tracking-wide">Welcome to ThinkSphere</p>
        <p className=" text-[15px] text-white tracking-wide">Login in or Signup to proceed the app</p>
        <OAuthButtons />
      </div>
    </main>
  );
}
