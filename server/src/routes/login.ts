import express from "express";
const router = express.Router();
import { handleLogin } from "../controllers/loginController";

router.route("/login").post(handleLogin);
