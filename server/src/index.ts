import express from "express";
const app = express();
// app.set("trust proxy", true);
import { default as projectsRouter } from "./routes/projects";
import { default as poolsRouter } from "./routes/pools";
import { default as categoriesRouter } from "./routes/categories";
import { default as userRouter } from "./routes/users";
import { default as imagesRouter } from "./routes/images";
import { limiter } from "./config/rateLimitOptions";
import sessionMiddleware from "./config/session-config";
import envHelper from "./utils/envHelper";
const cors = require("cors");

const entryDir = __dirname;
export { entryDir };

const PORT = envHelper("PORT");
const corsOrigin = envHelper("ORIGIN");

app.get("/ip", (req, res) => res.send(req.ip));
app.get("/x-forwarded-for", (req, res) =>
  res.send(req.headers["x-forwarded-for"])
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);
app.use(limiter);
app.use("/api/uploads", express.static("uploads"));
app.use("/api/projects", projectsRouter);
app.use("/api/pools", poolsRouter);
app.use("/api/categories", sessionMiddleware, categoriesRouter);
app.use("/api/users", userRouter);
app.use("/api/images", imagesRouter);
app.get("/api/ping", (req, res) => {
  try {
    res.status(200).json({ success: true, message: "pong" });
  } catch (err) {
    res.status(500).json({ success: false });
    console.error(err);
  }
});

app.all("*", (req, res) => {
  try {
    res.status(404).json({ success: false, message: "Resource not found" });
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
