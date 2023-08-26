import express from "express";
const router = express.Router();
import {
  createCategory,
  setCategoriesOnProject,
} from "../controllers/categoriesController";

router.route("/").post(createCategory);
router.route("/").put(setCategoriesOnProject);

export default router;
