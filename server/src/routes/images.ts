import express from "express";
import { fetchImages, deleteImage } from "../controllers/imagesController";
import { isAuth } from "../middleware/auth";
import sessionMiddleware from "../config/session-config";
const router = express.Router();

router
  .route("/")
  .get(sessionMiddleware, isAuth(["ADMIN", "EDITOR"]), fetchImages)
  .delete(sessionMiddleware, isAuth(["ADMIN", "EDITOR"]), deleteImage);

export default router;
