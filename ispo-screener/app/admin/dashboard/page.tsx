import { redirect } from "next/navigation";
import { headers } from "next/headers";
import styles from "./dashboard.module.css";
import Table from "./components/Table";
import isRole from "@/app/lib/isRole";
import AddProject from "./components/AddProject";
import { fetchAllProjects } from "@/app/lib/fetchIspoData";

export default async function Dashboard() {
  const cookie = headers().get("cookie");
  if (typeof cookie !== "string") {
    redirect("/admin");
  }
  const isAdmin = await isRole(cookie, "ADMIN");
  if (!isAdmin) {
    redirect("/admin");
  }
  const projects = await fetchAllProjects();

  return (
    <div className={styles["dashboard-wrapper"]}>
      <div className={styles["dashboard-subwrapper"]}>
        <div className={styles["table-wrapper"]}>
          <div className={styles["action-bar"]}>
            <AddProject method={"POST"} ISPO={{}} />
          </div>
          <Table projects={projects} />
        </div>
      </div>
    </div>
  );
}
