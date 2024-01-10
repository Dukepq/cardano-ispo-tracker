import express from "express";
const router = express.Router();
import {
  createCategory,
  setCategoriesOnProject,
} from "../controllers/categoriesController";
import { isAuth } from "../middleware/auth";

router.route("/").post(isAuth(["ADMIN"]), createCategory);
router.route("/").put(isAuth(["ADMIN"]), setCategoriesOnProject);

export default router;
