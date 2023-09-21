import express from "express";
import session from "express-session";
import { expressSessionOptions } from "../config/session-config";
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
  .get(session(expressSessionOptions), getAllProjects)
  .post(session(expressSessionOptions), isAuth("ADMIN"), createProject)
  .delete(session(expressSessionOptions), isAuth("ADMIN"), deleteProject)
  .put(session(expressSessionOptions), isAuth("ADMIN"), updateProject);

router.get("/:token", getProjectByToken);

export default router;
