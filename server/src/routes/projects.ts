import express from "express";
const router = express.Router();
import {
  getAllProjects,
  getProjectById,
  getProjectByToken,
} from "../controllers/projectsController";

router.get("/", getAllProjects);

router.get("/id/:id", getProjectById);

router.get("/:token", getProjectByToken);

export default router;
