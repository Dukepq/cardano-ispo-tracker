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
//
router
  .route("/register")
  .post(sessionMiddleware, isAuth(["ADMIN"]), registerUser);
router.route("/login").post(sessionMiddleware, loginUser);
router.route("/logout").post(sessionMiddleware, logoutUser);
router
  .route("/delete")
  .delete(sessionMiddleware, isAuth(["ADMIN"]), deleteUser);
router.route("/checkAuth").post(
  (req, res) => {
    console.log("/*********************AFTER MW************************/");
    console.log("full headers: ", req?.headers);
    console.log("ip", req?.headers?.ip);
    console.log("sessionID", req?.sessionID);
    console.log("role", req?.session?.role);
    console.log("cookie", req?.session?.cookie);
    console.log("/*********************AFTER MW*********************/");
  },
  sessionMiddleware,
  checkAuth
);
router.route("/").get(sessionMiddleware, isAuth(["ADMIN", "EDITOR"]), getUsers);

export default router;
