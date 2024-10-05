import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

// Create a new blog router
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    authorId: string;
  };
}>();

// Middleware to check if the user is logged in
blogRouter.use("/*", async (c, next) => {
  try {
    const header = c.req.header("Authorization") || "";
    if (!header) {
      c.status(401);
      return c.json({ message: "Unauthorized: No Authorization header" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      c.status(401);
      return c.json({ message: "Unauthorized: Token not provided" });
    }
    const response: any = await verify(token, c.env.JWT_SECRET);

    if (response) {
      c.set("authorId", response.id);
      return next();
    } else {
      c.status(401);
      return c.json({ message: "You are not logged in" });
    }
  } catch (error) {
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  }
});

// Create a new blog
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    if (!body.title || !body.content) {
      return c.json("Invalid title or content");
    }
    const authorId = c.get("authorId");
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });

    return c.json({
      message: "Blog created successfully",
      blog: blog,
      id: blog.id,
    });
  } catch (error) {
    c.status(500);
    return c.json("Failed to create blog");
  }
});

// Update a blog
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      message: "Blog updated successfully",
      blog: blog,
      id: blog.id,
    });
  } catch (error) {
    c.status(500);
    return c.json("Failed to update blog");
  }
});

// Fetch a blog
blogRouter.get("/get/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const blog = await prisma.post.findFirst({
      where: {
        id: id.toString(),
      },
    });

    if (blog) {
      return c.json({
        message: "Blog Fetched successfully",
        blog: blog,
      });
    } else {
      return c.json("Blog not found");
    }
  } catch (error) {
    c.status(500);
    return c.json("Failed to fetch blog");
  }
});

// Fetch all blogs
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany();
    return c.json({
      message: "Blogs fetched successfully",
      blogs: blogs,
    });
  } catch (error) {
    c.status(500);
    return c.json("Failed to fetch blog");
  }
});
