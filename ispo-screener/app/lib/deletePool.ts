import base from "./routes";

export default async function (ticker: string) {
  const response = await fetch(base + "/api/pools", {
    method: "DELETE",
    credentials: "include",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ticker }),
  });
  if (!response.ok) {
    throw new Error("failed to delete pool: " + response.status);
  }
  return response;
}
