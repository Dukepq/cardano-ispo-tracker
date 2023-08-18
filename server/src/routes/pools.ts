import express from "express";
const router = express.Router();
import {
  getAllPools,
  getPoolById,
  getPoolByTicker,
} from "../controllers/poolsController";

router.get("/", getAllPools);

router.get("/id/:id", getPoolById);

router.get("/:ticker", getPoolByTicker);

export default router;
