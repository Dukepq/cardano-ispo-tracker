import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  deleteUser,
  logoutUser,
  checkAuth,
  getUsers,
} from "../controllers/userController";
import { isAuth } from "../middleware/auth";
import sessionMiddleware from "../config/session-config";

router
  .route("/register")
  .post(sessionMiddleware, isAuth("ADMIN"), registerUser);
router.route("/login").post(sessionMiddleware, loginUser);
router.route("/logout").post(sessionMiddleware, logoutUser);
router.route("/delete").delete(sessionMiddleware, isAuth("ADMIN"), deleteUser);
router.route("/checkAuth").post(sessionMiddleware, checkAuth);
router.route("/").get(getUsers);

export default router;
