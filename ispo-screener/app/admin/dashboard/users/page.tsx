import { redirect } from "next/navigation";
import { headers } from "next/headers";
import isRole from "@/app/lib/isRole";
import AddUser from "./components/AddUser";

export default async function Page() {
  const cookie = headers().get("cookie");
  if (typeof cookie !== "string") {
    redirect("/admin");
  }
  const isAdmin = await isRole(cookie, "ADMIN");
  if (!isAdmin) {
    redirect("/admin");
  }
  return (
    <>
      <h1 style={{ color: "black" }}>user management here</h1>

      <AddUser />
    </>
  );
}
