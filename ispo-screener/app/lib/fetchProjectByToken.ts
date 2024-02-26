import base from "./routes";

export default async function fetchProjectByToken(
  token: string,
  revalidate = 3600
): Promise<ISPO> {
  const response = await fetch(
    base + `/api/projects/${token}/?pools=true&categories=true&logo=true`,
    {
      credentials: "include",
      next: { revalidate },
    }
  );
  if (!response.ok)
    throw new Error("failed to fetch project: " + response.status);
  return response.json();
}
