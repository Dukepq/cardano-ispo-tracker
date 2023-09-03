import express from "express";
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
  .post(isAuth("ADMIN"), createPoolOnProject)
  .delete(isAuth("ADMIN"), deletePool)
  .put(isAuth("ADMIN"), updatePool);
router.delete("/deleteAll", isAuth("ADMIN"), deleteManyPools);

router.get("/:ticker", getPoolByTicker);

export default router;
