import base from "./routes";
export default async function logout() {
  const response = await fetch(base + "/api/users/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("response not ok, logout failed");
  }
}
