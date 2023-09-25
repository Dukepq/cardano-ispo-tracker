const isRole = async (cookie: string, role: Role) => {
  const response = await fetch("http://localhost:5003/api/users/checkAuth", {
    method: "POST",
    cache: "no-cache",
    headers: {
      Cookie: cookie,
    },
  });
  const data = await response.json();
  if (data.auth === role) {
    return true;
  }
  return false;
};

export default isRole;
