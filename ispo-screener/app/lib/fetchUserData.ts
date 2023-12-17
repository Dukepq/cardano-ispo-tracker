import base from "./routes";

export async function fetchUsers(): Promise<UserResponse[]> {
  const response = await fetch(base + "/api/users", {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) throw new Error();
  return response.json();
}
