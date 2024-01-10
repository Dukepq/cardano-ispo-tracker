import express from "express";
import sessionMiddleware from "../config/session-config";
const router = express.Router();

import {
  getAllProjects,
  getProjectByToken,
  createProject,
  deleteProject,
  updateProject,
  uploadImage,
  getImage,
} from "../controllers/projectsController";
import { isAuth } from "../middleware/auth";
router
  .route("/")
  .get(getAllProjects)
  .post(sessionMiddleware, isAuth(["ADMIN"]), createProject)
  .delete(sessionMiddleware, isAuth(["ADMIN"]), deleteProject)
  .put(sessionMiddleware, isAuth(["ADMIN"]), updateProject);

router.post("/logo", getImage);
router.get("/:token", getProjectByToken);
router.post("/upload-image", sessionMiddleware, isAuth(["ADMIN"]), uploadImage);

export default router;
