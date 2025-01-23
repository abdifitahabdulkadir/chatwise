import { z } from "zod";

export const AuthParamsSchema = z.object({
  provider: z.enum(["google", "github"]),
});
