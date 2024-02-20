import base from "./routes";

type DeleteImageJSON =
  | { success: true; message: string; deleted: string }
  | { success: false; message: string };

export default async function deleteImage(
  filename: string
): Promise<DeleteImageJSON> {
  const response = await fetch(base + "/api/images", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filename,
    }),
    cache: "no-cache",
  });
  if (!response.ok) throw new Error("could not delete: " + response.status);
  return response.json();
}
