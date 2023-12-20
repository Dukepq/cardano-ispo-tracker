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

const requestByProjectTokenSchema = z.object({
  params: z.object({
    token: z.string().min(1).max(10).regex(new RegExp("^[0-9A-Z]+$")),
  }),
});

export const getPoolsByProjectToken = async (req: Request, res: Response) => {
  try {
    requestByProjectTokenSchema.parse(req);
    const params = req.params;
    const token = params.token;
    const pool = await prisma.pool.findMany({
      where: {
        owner: {
          token,
        },
      },
      select: {
        ...defaultPoolFieldsToSelect,
      },
    });
    if (!pool) {
      return res
        .status(400)
        .json({ success: false, message: "could not fetch pool by token" });
    }
    res.status(200).json(pool);
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "could not fetch pool by token" });
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
    res.status(201).json({
      success: true,
      message: `pool was successfully created on ${update.name}`,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "token likely didn't exist" });
  } finally {
    prisma.$disconnect();
  }
};

const deletePoolSchema = z.object({
  body: z.object({
    ticker: z.string(),
  }),
});

export const deletePool = async (req: Request, res: Response) => {
  const result = deletePoolSchema.safeParse(req);
  if (!result.success) {
    return res.status(406).json({
      success: false,
      message: "shape of request data likely incorrect",
    });
  }
  try {
    const target = result.data.body.ticker;
    const deleted = await prisma.pool.delete({
      where: {
        ticker: target,
      },
    });
    res.status(201).json({
      success: true,
      message: `${deleted.name} was successfully deleted.`,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  } finally {
    prisma.$disconnect();
  }
};

const deleteManyPoolsSchema = z.object({
  body: z.object({
    token: z.string().max(10),
  }),
});

export const deleteManyPools = async (req: Request, res: Response) => {
  const result = deleteManyPoolsSchema.safeParse(req);
  if (!result.success) {
    return res.status(406).json({
      success: false,
      message: "shape of request data likely incorrect",
    });
  }
  try {
    const target = result.data.body.token;
    const project = await prisma.project.findUnique({
      where: {
        token: target,
      },
      select: {
        id: true,
      },
    });

    const deleted = await prisma.pool.deleteMany({
      where: {
        project_id: project?.id,
      },
    });
    res.status(201).json({
      success: true,
      message: `${deleted.count} pools related to ${target} successfully deleted.`,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  } finally {
    prisma.$disconnect();
  }
};

const updatePoolSchema = z.object({
  body: z.object({
    ticker: z.string().max(10),
    pool: poolSchema.omit({ owner: true }),
  }),
});

export const updatePool = async (req: Request, res: Response) => {
  const result = updatePoolSchema.safeParse(req);
  if (!result.success) {
    return res.status(406).json({
      success: false,
      message: "shape of request data was likely incorrect",
    });
  }
  try {
    const target = result.data.body.ticker;
    const pool = result.data.body.pool;
    const update = await prisma.pool.update({
      where: {
        ticker: target,
      },
      data: pool,
    });
    return res.status(200).json({
      success: true,
      message: "pool successfully updated",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      message: "failed to update pool",
    });
  }
};
