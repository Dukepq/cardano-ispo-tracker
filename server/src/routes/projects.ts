import express from "express";
const router = express.Router();
import {
  getAllProjects,
  getProjectByToken,
} from "../controllers/projectsController";

router.route("/").get(getAllProjects).post();

router.get("/:token", getProjectByToken);

export default router;
