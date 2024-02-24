import { STAKE_POOL_SATURATION_LEVEL } from "../constants";

export function formatPools(pools: Pool[]) {
  return pools.map((pool) => formatPool(pool));
}

export function formatPool({
  margin,
  amountInPool,
  poolId,
  ticker,
  name,
}: Pool) {
  const percentageSaturated = STAKE_POOL_SATURATION_LEVEL / amountInPool;
  return {
    margin,
    percentageSaturated,
    poolId,
    ticker,
    name,
    amountInPool,
  };
}

export type FormattedPool = ReturnType<typeof formatPool>;
