import base from "./routes";

export default async function fetchProjectByToken(
  token: string
): Promise<ISPO> {
  const response = await fetch(
    base + `/api/projects/${token}/?pools=true&categories=true`,
    {
      credentials: "include",
      next: { revalidate: 0 },
    }
  );
  if (!response.ok)
    throw new Error("failed to fetch project: " + response.status);
  return response.json();
}
