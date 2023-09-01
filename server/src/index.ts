import express from "express";
const app = express();
import { default as projectsRouter } from "./routes/projects";
import { default as poolsRouter } from "./routes/pools";
import { default as categoriesRouter } from "./routes/categories";
import { default as userRouter } from "./routes/users";
import { limiter } from "./config/rateLimitOptions";
import session from "express-session";
import { prisma } from "./db";
import { expressSessionOptions } from "./config/express-session";

const PORT = process.env.PORT || 5000;

(async () => {
  await prisma.session.deleteMany();
})();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);
app.use(session(expressSessionOptions));
app.use("/api/projects", projectsRouter);
app.use("/api/pools", poolsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", userRouter);
app.get("/api/ping", (req, res) => {
  try {
    res.status(200).json({ success: "true", message: "pong" });
  } catch (err) {
    res.status(500).json({ success: "false" });
    console.error(err);
  }
});

declare module "express-session" {
  interface SessionData {
    count?: number;
  }
}

app.get("/test", (req, res) => {
  if (!req.session.count) {
    req.session.count = 1;
  } else {
    req.session.count += 1;
  }
  console.log(req.session);
  res.status(200).json({
    success: true,
    message: `cookie: ${JSON.stringify(req.session.cookie)}`,
  });
});
app.all("*", (req, res) => {
  try {
    res.status(404).json({ success: "false", message: "Resource not found" });
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
