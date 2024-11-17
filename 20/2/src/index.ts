import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { z } from "@hono/zod-openapi";

const app = new OpenAPIHono();

const ParamsSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(10)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "123",
    }),
});

const UserSchema = z.object({
  name: z.string().min(1).max(10).openapi({
    example: "John Doe",
  }),
  age: z.number().int().min(1).max(100).openapi({
    example: 25,
  }),
  id: z.string().min(1).max(10).openapi({
    example: "123",
  }),
});

const route = createRoute({
  method: "get",
  path: "/user/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Get User by ID",
    },
  },
});

const postRoute = createRoute({
  method: "post",
  path: "/user/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Get User by ID",
    },
  },
});

app.openapi(route, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    name: "John Doe",
    age: 25,
  });
});

app.openapi(postRoute, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    name: "John Doe",
    age: 25,
  });
});

app.get("/ui", swaggerUI({ url: "/doc" }));

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

export default app;
