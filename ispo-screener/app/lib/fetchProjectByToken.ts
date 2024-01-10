import base from "./routes";

export default async function fetchProjectByToken(
  token: string
): Promise<ISPO> {
  const response = await fetch(
    base + "/api/projects/TEST/?pools=true&categories=true",
    {
      credentials: "include",
      cache: "no-store",
    }
  );
  if (!response.ok)
    throw new Error("failed to fetch project: " + response.status);
  return response.json();
}
