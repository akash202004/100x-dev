import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.json());

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign(
    {
      email,
    },
    "secret"
  );
  res.cookie("token", token);
  res.json({ message: "Signed up", token: token });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign(
    {
      email,
    },
    "secret"
  );
  res.cookie("token", token);
  res.json({ message: "Signed up", token: token });
});

app.get("/user", (req, res) => {
  const token = req.cookies.token;
  const payload = jwt.verify(token, "secret") as JwtPayload;
  res.json({ email: payload.email });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json("Logged out");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
