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
  ticker: string;
  name?: string;
  poolId: string;
  amountInPool: number;
  committedPledge?: number;
  activePledge?: number;
  lifetimeRewards?: number;
  lifetimeBlocks?: number;
};
type Rewards = "NONE" | "PARTIAL" | "OPTIONAL" | "ALL" | "NOT_SPECIFIED";

type ISPO = {
  name: string;
  token: string;
  maxSupplyExists: boolean;
  maxSupply: number;
  distributingAmount: number;
  distributingPercentage?: string;
  takesRewards: Rewards;
  live: boolean;
  websiteURL?: string;
  logoImageURL?: string;
  description?: string;
  pools: Pool[];
  categories: Category[];
};

type Category = {
  name: string;
};

type User = {
  email: string;
  name: string;
  password: string;
  role: Role;
};

type UserResponse = Omit<User, "password"> & {
  createdAt: string;
  updatedAt: string;
};

type Role = "ADMIN" | "EDITOR" | "BASIC";

type DeleteUserResponse = { success: boolean; message: string };
