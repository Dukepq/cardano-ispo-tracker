import type { Pool, Project } from "@prisma/client";

export const formatPoolData = (pool: Pool | (Pool & { owner: Project })) => {
  if ("owner" in pool) {
    return {
      ticker: pool.ticker,
      name: pool.name,
      poolId: pool.poolId,
      amountInPool: pool.amountInPool,
      owner: pool.owner,
    };
  }
  return {
    ticker: pool.ticker,
    name: pool.name,
    poolId: pool.poolId,
    amountInPool: pool.amountInPool,
  };
};
