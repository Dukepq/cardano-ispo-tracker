type Pool = {
  ticker: string;
  name?: string;
  poolId: string;
  amountInPool: number;
  committedPledge?: number;
  activePledge?: number;
  lifetimeRewards?: number;
  lifetimeBlocks?: number;
  margin: number | string; // I hate this
};
type Rewards = "NONE" | "PARTIAL" | "OPTIONAL" | "ALL" | "NOT_SPECIFIED";

type ISPO = {
  name: string;
  token: string;
  maxSupplyExists: boolean;
  maxSupply?: number;
  distributingAmount: number;
  distributingPercentage?: string;
  takesRewards: Rewards;
  live: boolean;
  websiteURL?: string;
  logoImageURL?: string;
  description?: string;
  shortDescription?: string;
  pools: Pool[];
  categories: Category[];
  startsAt?: string;
  endsAt?: string;
  featured: boolean;
  logo: Pick<Logo, "size" | "url"> | null;
};

type Logo = {
  url: string;
  size: number;
  width: number | null;
  height: number | null;
  extension: string;
  mime: string;
  filename: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
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
