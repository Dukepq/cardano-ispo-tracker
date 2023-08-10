type ISPO = {
  name: string;
  categories: string[];
  description: string;
  website: string;
  logo: string;
  token: string;
  allocation: string;
  ratio: string;
  takesRewards: string[]; // multiple types of rewards are possible
  live: boolean;
  status: string | "upcoming" | "in progress" | "ended" | "paused";
};
