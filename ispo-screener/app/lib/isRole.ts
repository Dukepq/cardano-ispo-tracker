import base from "./routes";

const isRole = async (cookie: string, roles: Role[]) => {
  const response = await fetch(base + "/api/users/checkAuth", {
    method: "POST",
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  const data = await response.json();
  if (roles.includes(data.auth)) {
    return true;
  }
  return false;
};

export default isRole;
