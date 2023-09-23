import express from "express";
import sessionMiddleware from "../config/session-config";
const router = express.Router();
import {
  getAllProjects,
  getProjectByToken,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projectsController";
import { isAuth } from "../middleware/auth";
router
  .route("/")
  .get(sessionMiddleware, getAllProjects)
  .post(sessionMiddleware, isAuth("ADMIN"), createProject)
  .delete(sessionMiddleware, isAuth("ADMIN"), deleteProject)
  .put(sessionMiddleware, isAuth("ADMIN"), updateProject);

router.get("/:token", getProjectByToken);

export default router;
