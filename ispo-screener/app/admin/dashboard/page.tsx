import { redirect } from "next/navigation";
import { headers } from "next/headers";
import styles from "./dashboard.module.css";
import Table from "./components/Table";
import isRole from "@/app/lib/isRole";

export default async function Dashboard() {
  const cookie = headers().get("cookie");
  console.log(cookie);
  if (typeof cookie !== "string") {
    redirect("/admin");
  }
  const isAdmin = await isRole(cookie, "ADMIN");
  if (!isAdmin) {
    redirect("/admin");
  }

  return (
    <div className={styles["dashboard-wrapper"]}>
      <div className={styles["dashboard-subwrapper"]}>
        <div className={styles["table-wrapper"]}>
          <Table />
        </div>
      </div>
    </div>
  );
}
