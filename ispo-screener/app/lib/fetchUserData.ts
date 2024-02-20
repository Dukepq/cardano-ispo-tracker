import base from "./routes";

export async function fetchUsers(cookie: string): Promise<UserResponse[]> {
  const response = await fetch(base + "/api/users", {
    method: "GET",
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });
  if (!response.ok) throw new Error("something went wrong: " + response.status);
  return response.json();
}
