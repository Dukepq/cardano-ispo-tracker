import { formatPools, FormattedPool } from "./formatPools";

export type FormattedISPO = {
  name: string;
  token: string;
  live: boolean;
  rewards: Rewards;
  ratio?: number | null;
  allocatedPercentage?: number | null;
  categories: Category[];
  shortDescription?: string;
  description?: string;
  logoImageURL?: string;
  websiteURL?: string;
  maxSupply?: number;
  pools: FormattedPool[];
};

export default function formatISPOArray(projects: ISPO[]) {
  return projects.map((project) => {
    return formatISPO(project);
  });
}

export function formatISPO(project: ISPO): FormattedISPO {
  const {
    name,
    token,
    live,
    takesRewards,
    pools,
    distributingAmount,
    maxSupply,
    categories,
    shortDescription,
    description,
    logoImageURL,
    websiteURL,
  } = project;

  const totalInPools = pools.reduce(
    (acc, curr) => (acc += curr.amountInPool),
    0
  );

  const formattedPools = formatPools(pools);

  const ratio = totalInPools === 0 ? null : distributingAmount / totalInPools;
  const allocatedPercentage = maxSupply
    ? (distributingAmount / maxSupply) * 100
    : null;

  return {
    name,
    token,
    live,
    rewards: takesRewards,
    ratio,
    allocatedPercentage,
    categories,
    shortDescription,
    description,
    logoImageURL,
    websiteURL,
    maxSupply,
    pools: formattedPools,
  };
}
