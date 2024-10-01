import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/signup", (c) => {
  return c.text("Signup");
});

app.post("/api/v1/signin", (c) => {
  return c.text("signin");
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
