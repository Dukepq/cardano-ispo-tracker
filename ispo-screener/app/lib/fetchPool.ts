import next from "next";
import base from "./routes";

type Owner = {
  owner: {
    name: string;
    token: string;
  };
};

export default async function fetchPools(
  token: string,
  revalidate = 3600
): Promise<(Pool & Owner)[]> {
  const response = await fetch(`${base}/api/pools/${token}`, {
    method: "GET",
    next: { revalidate },
    credentials: "include",
  });
  if (!response.ok) throw new Error("failed to fetch pool");
  return response.json();
}
