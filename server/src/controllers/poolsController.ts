import { prisma } from "../db";
import { Request, Response } from "express";
import { z } from "zod";
import { poolSchema } from "../zod/schemas";

const defaultPoolFieldsToSelect = {
  ticker: true,
  name: true,
  poolId: true,
  amountInPool: true,
};

export const getAllPools = async (req: Request, res: Response) => {
  try {
    const pools = await prisma.pool.findMany({
      select: defaultPoolFieldsToSelect,
    });
    res.status(200).json(pools);
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};

const RequestByTickerSchema = z.object({
  params: z.object({
    ticker: z.string().min(1).max(10).regex(new RegExp("^[0-9A-Z]+$")),
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
      select: {
        ...defaultPoolFieldsToSelect,
        owner: {
          select: {
            name: true,
            token: true,
          },
        },
      },
    });
    if (!pool) {
      return res
        .status(404)
        .json({ success: false, message: "Resource not found" });
    }
    res.status(200).json(pool);
  } catch (err) {
    res.status(400).json({ success: false });
    console.error(err);
  } finally {
    prisma.$disconnect();
  }
};

const createPoolOnProjectSchema = z.object({
  body: z.object({
    token: z.string(),
    pools: z.array(poolSchema),
  }),
});

export const createPoolOnProject = async (req: Request, res: Response) => {
  const result = createPoolOnProjectSchema.safeParse(req);
  if (!result.success) {
    return res.status(406).json({
      success: false,
      message: "shape of request data likely incorrect",
    });
  }
  try {
    const body = result.data.body;
    console.log(body);
    const update = await prisma.project.update({
      where: {
        token: body.token,
      },
      data: {
        pools: {
          create: body.pools,
        },
      },
    });
    res.status(200).json(update);
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "token likely didn't exist" });
  }
};
