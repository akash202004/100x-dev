import express from "express";
import { z } from "zod";

export const app = express();

app.use(express.json());

const zInputs = z.object({
  a: z.number(),
  b: z.number(),
});

const header = z.object({
  c: z.number(),
  d: z.number(),
})

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  const sum = a + b;
  res.status(200).json({ Answer: sum });
});

app.post("/zsum", (req, res) => {
  const parseInp = zInputs.safeParse(req.body);

  if (!parseInp.success) {
    res.status(411).json({
      message: "Incorrect inputs",
    });
    return;
  }

  const answer = parseInp.data.a + parseInp.data.b;

  res.json({
    Answer: answer,
  });
});

app.get("/xsum", (req, res) => {
  const parsedResponse = header.safeParse({
    c: Number(req.headers["c"]),
    d: Number(req.headers["d"]),
  });

  if (!parsedResponse.success) {
    res.status(411).json({
      message: "Incorrect inputs",
    });
    return;
  }

  const answer = parsedResponse.data.c + parsedResponse.data.d;

  res.json({
    answer,
  });
});
