export const dummyData = [
  {
    name: "Tier Protocol",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "XYZ",
    categories: ["DeFi", "Lending"],
    allocation: "20%",
    ratio: "0.00006%",
    takesRewards: ["yes"],
    live: true,
  },
  {
    name: "Mongosi City",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "MCI",
    categories: ["Gaming"],
    allocation: "6%",
    ratio: "0.0000012%",
    takesRewards: ["no"],
    live: true,
  },
  {
    name: "Verbatum",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "VTUM",
    categories: ["DeFi", "Dex"],
    allocation: "50%",
    ratio: "0.000135%",
    takesRewards: ["yes"],
    live: true,
  },
  {
    name: "Mara Market",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "MARA",
    categories: ["NFT", "Marketplace"],
    allocation: "10%",
    ratio: "0.0000932%",
    takesRewards: ["partial"],
    live: false,
  },
  {
    name: "Zirum",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "CZIR",
    categories: ["gaming"],
    allocation: "90%",
    ratio: "0.00932%",
    takesRewards: ["optional"],
    live: true,
  },
  {
    name: "Cardano Casino",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "CACA",
    categories: ["gambling"],
    allocation: "1%",
    ratio: "0.00000000932%",
    takesRewards: ["no"],
    live: false,
  },
  {
    name: "Cardano Casino",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "CACA",
    categories: ["gambling"],
    allocation: "1%",
    ratio: "0.00000000932%",
    takesRewards: ["no"],
    live: true,
  },
  {
    name: "Cardano Casino",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "CACA",
    categories: ["gambling"],
    allocation: "1%",
    ratio: "0.00000000932%",
    takesRewards: ["no"],
    live: true,
  },
  {
    name: "Cardano Casino",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "CACA",
    categories: ["gambling"],
    allocation: "1%",
    ratio: "0.00000000932%",
    takesRewards: ["no"],
    live: false,
  },
  {
    name: "Cardano Casino",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "CACA",
    categories: ["gambling"],
    allocation: "1%",
    ratio: "0.00000000932%",
    takesRewards: ["no"],
    live: true,
  },
  {
    name: "Cardano Casino",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "CACA",
    categories: ["gambling"],
    allocation: "1%",
    ratio: "0.00000000932%",
    takesRewards: ["no"],
    live: true,
  },
  {
    name: "Cardano Casino",
    description: "test description",
    logo: "cardano-logo.svg",
    website: "https://www.youtube.com/",
    token: "CACA",
    categories: ["gambling"],
    allocation: "1%",
    ratio: "0.00000000932%",
    takesRewards: ["no"],
    live: true,
  },
];

export default async function getDummyDataAsync(): Promise<ISPO[]> {
  const wait = new Promise((res) => setTimeout(res, 6000));
  await wait;
  return [
    {
      name: "Tier Protocol",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "XYZ",
      categories: ["DeFi", "Lending"],
      allocation: "20%",
      ratio: "0.00006%",
      takesRewards: ["yes"],
      live: true,
    },
    {
      name: "Mongosi City",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "MCI",
      categories: ["Gaming"],
      allocation: "6%",
      ratio: "0.0000012%",
      takesRewards: ["no"],
      live: true,
    },
    {
      name: "Verbatum",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "VTUM",
      categories: ["DeFi", "Dex"],
      allocation: "50%",
      ratio: "0.000135%",
      takesRewards: ["yes"],
      live: true,
    },
    {
      name: "Mara Market",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "MARA",
      categories: ["NFT", "Marketplace"],
      allocation: "10%",
      ratio: "0.0000932%",
      takesRewards: ["partial"],
      live: false,
    },
    {
      name: "Zirum",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "CZIR",
      categories: ["gaming"],
      allocation: "90%",
      ratio: "0.00932%",
      takesRewards: ["optional"],
      live: true,
    },
    {
      name: "Cardano Casino",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "CACA",
      categories: ["gambling"],
      allocation: "1%",
      ratio: "0.00000000932%",
      takesRewards: ["no"],
      live: false,
    },
    {
      name: "Cardano Casino",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "CACA",
      categories: ["gambling"],
      allocation: "1%",
      ratio: "0.00000000932%",
      takesRewards: ["no"],
      live: true,
    },
    {
      name: "Cardano Casino",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "CACA",
      categories: ["gambling"],
      allocation: "1%",
      ratio: "0.00000000932%",
      takesRewards: ["no"],
      live: true,
    },
    {
      name: "Cardano Casino",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "CACA",
      categories: ["gambling"],
      allocation: "1%",
      ratio: "0.00000000932%",
      takesRewards: ["no"],
      live: false,
    },
    {
      name: "Cardano Casino",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "CACA",
      categories: ["gambling"],
      allocation: "1%",
      ratio: "0.00000000932%",
      takesRewards: ["no"],
      live: true,
    },
    {
      name: "Cardano Casino",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "CACA",
      categories: ["gambling"],
      allocation: "1%",
      ratio: "0.00000000932%",
      takesRewards: ["no"],
      live: true,
    },
    {
      name: "Cardano Casino",
      description: "test description",
      logo: "cardano-logo.svg",
      website: "https://www.youtube.com/",
      token: "CACA",
      categories: ["gambling"],
      allocation: "1%",
      ratio: "0.00000000932%",
      takesRewards: ["no"],
      live: true,
    },
  ];
}
