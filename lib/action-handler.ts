"use server";

import { auth } from "@/auth";
import { Session } from "next-auth";
import { ZodError, ZodSchema } from "zod";
import { UnauthorizedError, ValidationError } from "./http-erros";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

export async function actionHandler<T>({
  params,
  schema,
  authorize,
}: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.safeParse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>,
        );
      } else {
        return Error("Schema validation Failed");
      }
    }
  }

  let session: Session | null = null;
  if (authorize) {
    session = await auth();
    if (!session) {
      return new UnauthorizedError();
    }
  }

  return { params, session };
}
