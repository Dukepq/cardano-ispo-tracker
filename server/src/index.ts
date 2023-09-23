import express from "express";
const app = express();
import { default as projectsRouter } from "./routes/projects";
import { default as poolsRouter } from "./routes/pools";
import { default as categoriesRouter } from "./routes/categories";
import { default as userRouter } from "./routes/users";
import { limiter } from "./config/rateLimitOptions";
import { prisma } from "./db";
import sessionMiddleware from "./config/session-config";
const cors = require("cors");

const PORT = process.env.PORT || 5000;

(async () => {
  await prisma.session.deleteMany();
})();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(limiter);
app.use("/api/projects", projectsRouter);
app.use("/api/pools", poolsRouter);
app.use("/api/categories", sessionMiddleware, categoriesRouter);
app.use("/api/users", sessionMiddleware, userRouter);
app.get("/api/ping", (req, res) => {
  try {
    res.status(200).json({ success: "true", message: "pong" });
  } catch (err) {
    res.status(500).json({ success: "false" });
    console.error(err);
  }
});

app.get("/test", (req, res) => {
  console.log(req.session.id);
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
