import base from "./routes";

type Owner = {
  owner: {
    name: string;
    token: string;
  };
};

export default async function fetchPools(
  token: string
): Promise<(Pool & Owner)[]> {
  const response = await fetch(`${base}/api/pools/${token}`, {
    method: "GET",
    cache: "no-cache",
  });
  if (!response.ok) throw new Error("failed to fetch pool");
  return response.json();
}
