import { Hono } from "hono";
import { decode, verify, sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  if (!body.email || !body.password) {
    return c.json("Invalid email or password");
  }

  // const hashPassword = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.create({
    data: {
      name: body?.name,
      email: body.email,
      password: body.password,
    },
  });

  const token = sign({ id: user.id }, c.env.JWT_SECRET);
  if (!token) {
    c.status(500);
    return c.json("Failed to create token");
  }

  return c.json({ mesaage: "User created Successfully", token: token });
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    c.status(404);
    return c.json("User not found");
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ message: "User logged in successfully", token: token });
});

app.post("/api/v1/blog", (c) => {
  return c.text("post blog");
});

app.put("/api/v1/blog", (c) => {
  return c.text("put blog");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("blog id");
});

export default app;
