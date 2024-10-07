import z from "zod";

// Define the schema for the input
export const signupInput = z.object({
  username: z.string().min(6).optional(),
  email: z.string().email(),
  password: z.string().min(6),
})

// Define the schema for the input
export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

// Define the schema for the input
export const createBlogInput = z.object({
    title : z.string().min(3),
    content : z.string().min(10),
})

// Define the schema for the input
export const updateBlogInput = z.object({
    title : z.string().min(3).optional(),
    content : z.string().min(10).optional(),
    id: z.string().uuid(),
})

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;