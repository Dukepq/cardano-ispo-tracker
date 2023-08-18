import type { Project, Pool } from "@prisma/client";
import { formatPoolData } from "./PoolDataFormatting";

export const formatProjectData = (project: Project & { pools: Pool[] }) => {
  return {
    name: project.name,
    token: project.token,
    maxSupplyExists: project.maxSupplyExists,
    maxSupply: project.maxSupply,
    distributingAmount: project.DistributingAmount,
    live: project.live,
    pools: project.pools.map((pool) => {
      return formatPoolData(pool);
    }),
  };
};
