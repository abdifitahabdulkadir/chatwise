import { z } from "zod";

export const AuthParamsSchema = z.object({
  provider: z.enum(["google", "github"]),
});

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name field is required")
    .max(15, "Name field cannot exceed 15 characters")
    .regex(/[a-zA-Z]/),
  email: z.string().email("Please provide valid email"),
  password: z
    .string()
    .min(1, "Password field is required")
    .max(20, "Password field cannot exceed 20 characters")
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^0-9a-zA-Z]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const SignInSchema = z.object({
  email: z.string().email("Please provide valid email"),
  password: z
    .string()
    .min(1, "Password field is required")
    .max(20, "Password field cannot exceed 20 characters")
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^0-9a-zA-Z]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["google", "github", "credentials"]),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account Id is required" }),
  user: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address." }),
    image: z
      .string()
      .url({ message: "Please provide a valid URL." })
      .optional(),
  }),
});
