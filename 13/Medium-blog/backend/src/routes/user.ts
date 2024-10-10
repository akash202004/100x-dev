import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signupInput, signinInput } from "medium-vlog-project";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json("Invalid input");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existingUser) {
      c.status(409);
      return c.json({ message: "User already exists with this email" });
    }

    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(500);
      return c.json({ message: "Failed to create user" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    if (!token) {
      c.status(500);
      return c.json({ message: "Failed to create token" });
    }

    return c.json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error); 
    c.status(500);
    return c.json({ message: "Failed to create user" });
  }
});

// signin
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json("Invalid input");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(404);
      return c.json("User not found");
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ message: "User logged in successfully", token: token });
  } catch (error) {
    c.status(500);
    return c.json("Failed to login");
  }
});
