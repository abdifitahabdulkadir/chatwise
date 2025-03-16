"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import handleError from "../error-handler";
import { AuthParamsSchema, SignInSchema, SignUpSchema } from "../validations";

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

// signup action for basic credentials based signup
export async function signUpWithCrendentials(
  params: z.infer<typeof SignUpSchema>,
): Promise<ActionResponse> {
  const { email, password, name } = params!;
  try {
    const existedUer = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existedUer) throw new Error("User is already existed");

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.$transaction(async (prismaClient) => {
      const newUser = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      // create account that associates with that user.
      await prismaClient.account.create({
        data: {
          userId: newUser.id,
          name,
          provider: "credentials",
          password: hashedPassword,
          providerAccountId: email,
        },
      });
    });

    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    return handleError("server", error) as ErrorResponse;
  }
}

// signin action
export async function signInWithCredentials(
  params: z.infer<typeof SignInSchema>,
): Promise<ActionResponse> {
  const { email, password } = params!;

  try {
    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    return handleError("server", error) as ErrorResponse;
  }
}
