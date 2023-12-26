import base from "./routes";

export default async function updateCategory(
  projectToken: string,
  categories: { name: string }[]
) {
  const response = await fetch(base + "/api/categories", {
    method: "PUT",
    body: JSON.stringify({
      token: projectToken,
      categories,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("response not ok: " + response.status);
  }
  return response.json();
}
