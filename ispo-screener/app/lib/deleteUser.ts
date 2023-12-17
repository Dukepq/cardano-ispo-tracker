import base from "./routes";
export default async function deleteUser(
  email: string
): Promise<DeleteUserResponse> {
  const response = await fetch(base + "/api/users/delete", {
    method: "DELETE",
    credentials: "include",
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  if (!response.ok) throw new Error("failed to delete user");
  return response.json();
}
