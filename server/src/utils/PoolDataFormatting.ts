import type { Pool } from "@prisma/client";

export const formatPoolsData = (pools: Pool[]) => {
  return pools.map((pool) => {
    return formatPoolData(pool);
  });
};

export const formatPoolData = (pool: Pool) => {
  return {
    ticker: pool.ticker,
    name: pool.name || null,
    poolId: pool.poolId,
    amountInPool: pool.amountInPool,
  };
};
