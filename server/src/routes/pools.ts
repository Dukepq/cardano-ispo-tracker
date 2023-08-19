import express from "express";
const router = express.Router();
import { getAllPools, getPoolByTicker } from "../controllers/poolsController";

router.get("/", getAllPools);

router.get("/:ticker", getPoolByTicker);

export default router;
