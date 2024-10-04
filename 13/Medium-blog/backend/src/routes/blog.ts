import { Hono } from "hono";
import { decode, verify, sign } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header) {
    c.status(401);
    return c.json({ message: "Unauthorized: No Authorization header" });
  }
  const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET);
  if (response.id) {
    return next();
  } else {
    c.status(401);
    return c.json("Unauthorized");
  }
});

blogRouter.post("/", (c) => {
  return c.text("post blog");
});

blogRouter.put("/", (c) => {
  return c.text("put blog");
});

blogRouter.get("/", (c) => {
  return c.text("blog id");
});

blogRouter.get("/bulk", (c) => {
  return c.text("blog id");
});
