import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "medium-vlog-project";

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
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json("Invalid input");
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

// update a blog
blogRouter.patch("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { id } = c.req.param(); 
    const body = await c.req.json(); 
    
    const { success, error } = updateBlogInput.safeParse({ id, ...body });
    if (!success) {
      const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      c.status(400);
      return c.json({
        message: "Invalid input",
        errors: errors, 
      });
    }

    const blog = await prisma.post.update({
      where: { id }, 
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Update blog error:", error);
    c.status(500);
    return c.json({
      message: "Failed to update blog",
    });
  }
});

// delete a  blog
blogRouter.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.delete({
      where: {
        id: c.req.param("id"),
      },
    });
    if (!blog) {
      return c.json("Blog not found");
    }

    return c.json({
      message: "Blog deleted successfully",
      blog: blog,
      id: blog.id,
    });
  } catch (error) {
    c.status(500);
    return c.json("Failed to delete blog");
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
      select: {
        title: true,
        content: true,
        published: true,
        id: true,
        author: {
          select: {
            username: true,
          },
        },
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
    const blogs = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        published: true,
        id: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    return c.json({
      message: "Blogs fetched successfully",
      blogs: blogs,
    });
  } catch (error) {
    c.status(500);
    return c.json("Failed to fetch blog");
  }
});

// Fetch particular user's blogs
blogRouter.get("/user/posts", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const authorId = c.get("authorId");

    const blogs = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
      select: {
        title: true,
        content: true,
        published: true,
        id: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    if (blogs.length === 0) {
      return c.json({ message: "No blogs found for this user" });
    }

    return c.json({
      message: "Blogs fetched successfully",
      blogs: blogs,
    });
  } catch (error) {
    c.status(500);
    return c.json({ message: "Failed to fetch user blogs" });
  }
});
