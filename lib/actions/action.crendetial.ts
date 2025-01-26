"use server";

import { signIn } from "@/auth";
import AccountModel from "@/database/account.model";
import UserModel from "@/database/user.model";
import mongoose from "mongoose";
import handleError from "../error-handler";
import { SignInSchema, SignUpSchema } from "../validations";
import { z } from "zod";
import bcrypt from "bcryptjs";
import dbConnect from "../dbconnection";
// signup action for basic credentials based signup
export async function signUpWithCrendentials(
  params: z.infer<typeof SignUpSchema>,
): Promise<ActionResponse> {
  await dbConnect();

  const { email, password, name } = params!;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existedUer = await UserModel.findOne({ email }).session(session);

    if (existedUer) throw new Error("User is already existed");

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await UserModel.create<UserI>(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session },
    );
    // create account that associates with that user.
    await AccountModel.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          password: hashedPassword,
          providerAccountId: email,
        },
      ],
      { session },
    );
    await session.commitTransaction();
    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    if (!session.transaction.isCommitted) await session.abortTransaction();
    return handleError("server", error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

// signin action
export async function signInWithCredentials(
  params: z.infer<typeof SignInSchema>,
): Promise<ActionResponse> {
  await dbConnect();
  const { email, password } = params!;

  try {
    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    return handleError("server", error) as ErrorResponse;
  }
}
