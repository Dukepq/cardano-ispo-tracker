const isRole = async (cookie: string, roles: Role[]) => {
  const response = await fetch("http://localhost:5003/api/users/checkAuth", {
    method: "POST",
    cache: "no-cache",
    headers: {
      Cookie: cookie,
    },
  });
  const data = await response.json();
  if (roles.includes(data.auth)) {
    return true;
  }
  return false;
};

export default isRole;
