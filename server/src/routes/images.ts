import express from "express";
import {
  fetchImages,
  cloudinaryDelete,
  cloudinaryUpload,
} from "../controllers/imagesController";
import { isAuth } from "../middleware/auth";
import sessionMiddleware from "../config/session-config";
const router = express.Router();

router
  .route("/")
  .get(sessionMiddleware, isAuth(["ADMIN", "EDITOR"]), fetchImages)
  .delete(sessionMiddleware, isAuth(["ADMIN", "EDITOR"]), cloudinaryDelete)
  .post(sessionMiddleware, isAuth(["ADMIN", "EDITOR"]), cloudinaryUpload);

export default router;
