// type ISPO = {
//   name: string;
//   categories: string[];
//   description: string;
//   website: string;
//   logo: string;
//   token: string;
//   allocation: string;
//   ratio: string;
//   takesRewards: string[]; // multiple types of rewards are possible
//   live: boolean;
//   status: string | "upcoming" | "in progress" | "ended" | "paused";
// };

type Pool = {
  name: string | null;
  poolId: string;
  amountInPool: number;
};

type ISPO = {
  name: string;
  token: string;
  maxSupplyExists: boolean;
  maxSupply: number;
  distributingAmount: number;
  live: boolean;

  pools: Pool[];
};

type Role = "ADMIN" | "EDITOR" | "BASIC";
