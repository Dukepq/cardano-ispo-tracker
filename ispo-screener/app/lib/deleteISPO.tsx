import base from "./routes";

export async function deleteISPO(token: string) {
  const response = await fetch(base + "/api/projects", {
    method: "DELETE",
    credentials: "include",
    body: JSON.stringify({
      token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error("could not delete token: " + token);
  }
}
