import express from "express";
import sessionMiddleware from "../config/session-config";
const router = express.Router();
import {
  getAllPools,
  getPoolByTicker,
  createPoolOnProject,
  deletePool,
  deleteManyPools,
  updatePool,
} from "../controllers/poolsController";
import { isAuth } from "../middleware/auth";

router
  .route("/")
  .get(getAllPools)
  .post(sessionMiddleware, isAuth("ADMIN"), createPoolOnProject)
  .delete(sessionMiddleware, isAuth("ADMIN"), deletePool)
  .put(sessionMiddleware, isAuth("ADMIN"), updatePool);
router.delete(
  "/deleteAll",
  isAuth("ADMIN"),
  sessionMiddleware,
  deleteManyPools
);

router.get("/:ticker", getPoolByTicker);

export default router;
