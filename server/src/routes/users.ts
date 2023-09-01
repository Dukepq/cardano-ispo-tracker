import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  deleteUser,
} from "../controllers/userController";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/delete").post(deleteUser);

export default router;
