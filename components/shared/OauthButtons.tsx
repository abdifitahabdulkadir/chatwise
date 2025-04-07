"use client";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
export function OAuthButtons({ disabled }: { disabled: boolean }) {
  const handleAuth = async (provider: "github" | "google") => {
    try {
      await signIn(provider, { redirect: true, redirectTo: "/chat" });
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
        disabled={disabled}
        onClick={() => handleAuth("github")}
        className="!bg-tele-green hover:!bg-dark-gray cursor-pointer rounded-md px-2 py-6 !text-white transition-all duration-300"
      >
        Continue with Github
      </Button>

      <Button
        disabled={disabled}
        onClick={() => handleAuth("google")}
        className="!bg-tele-green hover:!bg-dark-gray cursor-pointer rounded-md px-2 py-6 !text-white transition-colors duration-300"
      >
        Continue with Google
      </Button>
    </div>
  );
}
