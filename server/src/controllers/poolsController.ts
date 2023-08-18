import { prisma } from "../db";
import { Request, Response } from "express";
import { formatPoolData } from "../utils/PoolDataFormatting";
import { z } from "zod";

export const getAllPools = async (req: Request, res: Response) => {
  try {
    const pools = await prisma.pool.findMany();
    const formattedPools = pools.map((pool) => {
      return formatPoolData(pool);
    });
    res.status(200).json({ success: "true", data: formattedPools });
  } catch (err) {
    res.status(404).json({ success: "false", message: "not found" });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};

const RequestByIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

export const getPoolById = async (req: Request, res: Response) => {
  try {
    RequestByIdSchema.parse(req);
    const params = req.params;
    const id = Number(params.id);
    const pool = await prisma.pool.findUnique({
      where: {
        id: id,
      },
    });
    if (!pool) {
      return res
        .status(404)
        .json({ success: "false", message: "Resource not found" });
    }
    const formattedPool = formatPoolData(pool);
    res.status(200).json({ success: "true", data: formattedPool });
  } catch (err) {
    res.status(400).json({ success: "false" });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};

const RequestByTickerSchema = z.object({
  params: z.object({
    ticker: z.string().min(1).max(10).regex(new RegExp("^[A-Z]+$")),
  }),
});

export const getPoolByTicker = async (req: Request, res: Response) => {
  try {
    RequestByTickerSchema.parse(req);
    const params = req.params;
    const ticker = params.ticker;
    const pool = await prisma.pool.findUnique({
      where: {
        ticker: ticker,
      },
    });
    if (!pool) {
      return res
        .status(404)
        .json({ success: "false", message: "Resource not found" });
    }
    const formattedPool = formatPoolData(pool);
    res.status(200).json({ success: "true", data: formattedPool });
  } catch (err) {
    res.status(400).json({ success: "false" });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};
