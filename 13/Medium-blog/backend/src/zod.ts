import { z } from "zod";

export const signupInput = z.object({
  username: z.string().min(6).optional(),
  email: z.string().email(),
  password: z.string().min(6),
})

export type signupInput = z.infer<typeof signupInput>;