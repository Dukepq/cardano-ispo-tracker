import express from "express";
import {
  fetchImages,
  deleteImage,
  cloudinaryDelete,
} from "../controllers/imagesController";
import { isAuth } from "../middleware/auth";
import sessionMiddleware from "../config/session-config";
import { cloudinaryUpload } from "../controllers/imagesController";
const router = express.Router();

router
  .route("/")
  .get(sessionMiddleware, isAuth(["ADMIN", "EDITOR"]), fetchImages)
  .delete(sessionMiddleware, isAuth(["ADMIN", "EDITOR"]), cloudinaryDelete)
  .post(sessionMiddleware, isAuth(["ADMIN", "EDITOR"]), cloudinaryUpload);

export default router;
