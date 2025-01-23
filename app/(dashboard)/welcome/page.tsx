import { auth } from "@/auth";
import { OAuthButtons } from "@/components/OauthButtons";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-MediumGray">
      <div className="flex h-fit w-fit flex-col items-center gap-4 py-3">
        <Image
          src={"/icons/logo.svg"}
          alt="logo icon"
          width={60}
          height={60}
          quality={100}
          loading="eager"
          priority
          className="object-contain"
        />
        <p className="text-[15px] font-medium tracking-wide text-white">
          Welcome to ThinkSphere
        </p>
        <p className="text-[15px] tracking-wide text-white">
          Login in or Signup to proceed the app
        </p>
        <OAuthButtons />
      </div>
    </main>
  );
}
