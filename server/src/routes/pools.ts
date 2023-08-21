import express from "express";
const router = express.Router();
import {
  getAllPools,
  getPoolByTicker,
  createPoolOnProject,
} from "../controllers/poolsController";

router.route("/").get(getAllPools).post(createPoolOnProject);

router.get("/:ticker", getPoolByTicker);

export default router;
