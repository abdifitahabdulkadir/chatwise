"use server";

import { signIn, signOut } from "@/auth";
import { AuthParamsSchema } from "../validations";

interface AuthProps {
  provider: string;
}
export async function signInWithOAuth({ provider }: AuthProps) {
  try {
    const validate = AuthParamsSchema.safeParse({ provider });

    if (!validate.success) throw new Error("Invalid provider");

    await signIn(provider, { redirect: false });

    return { success: true };
  } catch (error: unknown) {
    throw new Error(error as string);
  }
}

export async function singOutOAuth() {
  try {
    await signOut();
  } catch (error: unknown) {
    throw new Error(error as string);
  }
}
