import { formatPools, FormattedPool } from "./formatPools";
import isLive from "./isLive";

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
  totalStaked: number;
  startsAt?: string;
  endsAt?: string;
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
    startsAt,
    endsAt,
  } = project;

  const totalInPools = pools.reduce(
    (acc, curr) => (acc += curr.amountInPool),
    0
  );

  const formattedPools = formatPools(pools);

  let totalStaked = 0;
  for (let i = 0; i < formattedPools.length; i++) {
    const { amountInPool } = formattedPools[i];
    if (typeof amountInPool !== "number") continue;
    totalStaked += amountInPool;
  }

  const _isLive = isLive(startsAt, endsAt);

  const ratio = totalInPools === 0 ? null : distributingAmount / totalInPools;
  const allocatedPercentage = maxSupply
    ? (distributingAmount / maxSupply) * 100
    : null;

  return {
    name,
    token,
    live: _isLive,
    rewards: takesRewards,
    ratio,
    allocatedPercentage,
    categories,
    shortDescription,
    description,
    logoImageURL,
    websiteURL,
    maxSupply,
    totalStaked,
    pools: formattedPools,
    endsAt,
    startsAt,
  };
}
