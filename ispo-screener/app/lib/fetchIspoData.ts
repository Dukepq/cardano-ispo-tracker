export async function fetchAllProjects(): Promise<ISPO[]> {
  const response = await fetch("http://localhost:5003/api/projects", {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("failed to fetch projects");
  return response.json();
}

export async function fetchAllPools(): Promise<Pool[]> {
  const response = await fetch("http://localhost:5003/api/pools", {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("failed to fetch projects");
  return response.json();
}
