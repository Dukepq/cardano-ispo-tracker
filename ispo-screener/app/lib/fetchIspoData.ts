import base from "./routes";

export async function fetchAllProjects(revalidate = 3600): Promise<ISPO[]> {
  const response = await fetch(
    base + "/api/projects?pools=true&categories=true&logo=true",
    {
      next: { revalidate },
    }
  );
  if (!response.ok) throw new Error("failed to fetch projects");
  return response.json();
}

export async function fetchAllPools(revalidate = 3600): Promise<Pool[]> {
  const response = await fetch(base + "/api/pools", {
    next: { revalidate },
  });
  if (!response.ok) throw new Error("failed to fetch pools");
  return response.json();
}
