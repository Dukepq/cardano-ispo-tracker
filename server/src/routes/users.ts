import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  deleteUser,
  logoutUser,
} from "../controllers/userController";
import { isAuth } from "../middleware/auth";

router.route("/register").post(isAuth("ADMIN"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/delete").delete(isAuth("ADMIN"), deleteUser);

export default router;
