import { redirect } from "next/navigation";
import { headers } from "next/headers";
import isRole from "@/app/lib/isRole";
import { fetchUsers } from "@/app/lib/fetchUserData";
import UserTable from "./components/userTable";
import styles from "../../dashboard/dashboard.module.css";
import PageHeader from "../components/PageHeader";

export default async function Page() {
  const cookie = headers().get("cookie");
  if (typeof cookie !== "string") {
    redirect("/admin");
  }
  const isAdmin = await isRole(cookie, ["ADMIN"]);
  if (!isAdmin) {
    redirect("/admin");
  }
  const users = await fetchUsers();
  return (
    <>
      <PageHeader>
        <h2 className={styles.title}>User Management</h2>
      </PageHeader>
      <div className={styles["table-wrapper"]}>
        <UserTable users={users} />
      </div>
    </>
  );
}
