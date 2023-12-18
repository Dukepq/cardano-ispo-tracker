import { redirect } from "next/navigation";
import { headers } from "next/headers";
import isRole from "@/app/lib/isRole";
import AddUser from "./components/AddUser";
import { fetchUsers } from "@/app/lib/fetchUserData";
import UserTable from "../components/userTable";

export default async function Page() {
  const cookie = headers().get("cookie");
  if (typeof cookie !== "string") {
    redirect("/admin");
  }
  const isAdmin = await isRole(cookie, "ADMIN");
  if (!isAdmin) {
    redirect("/admin");
  }
  const users = await fetchUsers();
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <AddUser />
      </div>
      <UserTable users={users} />
    </>
  );
}
