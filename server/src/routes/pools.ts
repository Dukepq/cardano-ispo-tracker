import express from "express";
const router = express.Router();
import {
  getAllPools,
  getPoolByTicker,
  createPoolOnProject,
  deletePool,
  deleteManyPools,
} from "../controllers/poolsController";

router.route("/").get(getAllPools).post(createPoolOnProject).delete(deletePool);
router.delete("/deleteAll", deleteManyPools);

router.get("/:ticker", getPoolByTicker);

export default router;
