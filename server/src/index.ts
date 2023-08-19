import express from "express";
const app = express();
import { default as projectsRouter } from "./routes/projects";
import { default as poolsRouter } from "./routes/pools";
import { limiter } from "./config/rateLimitOptions";
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(limiter);
app.use("/api/projects", projectsRouter);
app.use("/api/pools", poolsRouter);
app.get("/api/ping", (req, res) => {
  try {
    res.status(200).json({ success: "true", message: "pong" });
  } catch (err) {
    res.status(500).json({ success: "false" });
    console.error(err);
  }
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
