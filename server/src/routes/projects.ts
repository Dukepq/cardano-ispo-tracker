import express from "express";
const router = express.Router();
import {
  getAllProjects,
  getProjectByToken,
} from "../controllers/projectsController";

router.get("/", getAllProjects);

router.get("/:token", getProjectByToken);

export default router;
