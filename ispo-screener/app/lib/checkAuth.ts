type Roles = "ADMIN" | "BASIC" | "EDITOR";
type ResponseType = {
  success: boolean;
  auth: Roles | null;
};

export default async function checkAuth(auth: Roles) {
  const response = await fetch("http://localhost:5003/api/users/checkAuth", {
    method: "POST",
    credentials: "include",
    cache: "no-cache",
  });
  console.log(response.ok);
  if (response.ok) {
    const data: ResponseType = await response.json();
    console.log(data);
    return data.auth;
  } else {
    throw new Error("something went wrong");
  }
}