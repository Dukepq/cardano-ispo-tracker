import base from "./routes";

export default async function fetchImage(path: string): Promise<Blob> {
  const response = await fetch(base + "/api/projects/logo", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path,
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(response.status + " could not fetch image");
  return response.blob();
}
