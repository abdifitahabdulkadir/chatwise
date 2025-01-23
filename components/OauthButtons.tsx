"use client";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
export function OAuthButtons() {
  const handleAuth = async (provider: "github" | "google") => {
    try {
      await signIn(provider, { redirect: false, redirectTo: "/" });
    } catch (error) {
      toast({
        title: "SignIn Failed!",
        variant: "destructive",
        description:
          error instanceof Error
            ? "Faild to sign In with " + provider
            : "An error occured while authenticating with " + provider,
      });
    }
  };
  return (
    <div className="borde flex h-full w-fit flex-col gap-3 px-3 py-4 md:flex-row">
      <Button
        onClick={() => handleAuth("github")}
        className="rounded-md bg-TealGreen px-2 py-6 text-white transition-all duration-300 hover:bg-DarkGray"
      >
        Continue with Github
      </Button>

      <Button
        onClick={() => handleAuth("google")}
        className="rounded-md bg-TealGreen px-2 py-6 text-white transition-colors duration-300 hover:bg-DarkGray"
      >
        Continue with Google
      </Button>
    </div>
  );
}
