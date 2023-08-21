import express from "express";
const router = express.Router();
import {
  getAllProjects,
  getProjectByToken,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projectsController";

router
  .route("/")
  .get(getAllProjects)
  .post(createProject)
  .delete(deleteProject)
  .put(updateProject);

router.get("/:token", getProjectByToken);

export default router;
