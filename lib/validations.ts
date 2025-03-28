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

export const StoreChatSchema = z.object({
  answer: z.string().min(1, "Answer field is required"),
  role: z.enum(["system", "user"]),
  question: z.string().min(1, "Question field is required").optional(),
  chatId: z.string().min(1, "Title Id is required").optional(),
});

export const GetAllChatsSchema = z.object({
  chatId: z.string().min(1, "Title Id is required"),
});

export const RenameChatTitleSchema = z.object({
  chatTitleId: z.string().min(1, { message: "Chat title id is required" }),
  newTitile: z
    .string()
    .min(1, { message: " the New title is required to rename" }),
  currentPath: z.string().min(1, "The current Path is required"),
});
export const DeleteChatTitleShcema = RenameChatTitleSchema.omit({
  newTitile: true,
});
