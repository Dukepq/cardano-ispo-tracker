import express from "express";
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
  .get(getAllProjects)
  .post(isAuth("ADMIN"), createProject)
  .delete(isAuth("ADMIN"), deleteProject)
  .put(isAuth("ADMIN"), updateProject);

router.get("/:token", getProjectByToken);

export default router;
