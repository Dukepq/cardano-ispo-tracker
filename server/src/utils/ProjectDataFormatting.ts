import type { Project, Pool, Category } from "@prisma/client";
import { formatPoolData } from "./PoolDataFormatting";

export const formatProjectData = (
  project: Project & { pools: Pool[] } & { categories: Category[] }
) => {
  return {
    name: project.name,
    token: project.token,
    maxSupplyExists: project.maxSupplyExists,
    maxSupply: project.maxSupply,
    distributingAmount: project.DistributingAmount,
    distributingPercentage: project.distributingPercentage,
    live: project.live,
    description: project.description,
    takesRewards: project.takesRewards,
    pools: project.pools.map((pool) => {
      return formatPoolData(pool);
    }),
    categories: project.categories.map((category) => {
      return category.name;
    }),
  };
};
