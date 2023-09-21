import express from "express";
import session from "express-session";
import { expressSessionOptions } from "../config/session-config";
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
  .post(session(expressSessionOptions), isAuth("ADMIN"), createPoolOnProject)
  .delete(session(expressSessionOptions), isAuth("ADMIN"), deletePool)
  .put(session(expressSessionOptions), isAuth("ADMIN"), updatePool);
router.delete(
  "/deleteAll",
  isAuth("ADMIN"),
  session(expressSessionOptions),
  deleteManyPools
);

router.get("/:ticker", getPoolByTicker);

export default router;
