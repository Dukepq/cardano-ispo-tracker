export default function formatISPOArray(projects: ISPO[]) {
  return projects.map((project) => {
    const {
      name,
      token,
      live,
      takesRewards,
      pools,
      distributingAmount,
      maxSupply,
      categories,
    } = project;
    const totalInPools = pools.reduce(
      (acc, curr) => (acc += curr.amountInPool),
      0
    );
    const ratio = pools.length === 0 ? null : distributingAmount / totalInPools;
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
    };
  });
}

export type FormattedISPO = ReturnType<typeof formatISPOArray>[0];
